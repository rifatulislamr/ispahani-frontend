'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ChartOfAccount } from '@/utils/type'
import { getAllCoa } from '@/api/general-ledger-api'
import { FileText } from 'lucide-react'

interface SingleTrialBalanceFindProps {
  initialAccountCode: string
  initialFromDate: string
  initialToDate: string
  onSearch: (accountcode: number, fromdate: string, todate: string) => void
  generatePdf: () => void
  generateExcel: () => void
}

export default function SingleTrialBalanceFind({
  initialAccountCode,
  initialFromDate,
  initialToDate,
  onSearch,
  generatePdf,
  generateExcel,
}: SingleTrialBalanceFindProps) {
  const [fromDate, setFromDate] = useState<string>(initialFromDate)
  const [toDate, setToDate] = useState<string>(initialToDate)
  const [selectedAccountCode, setSelectedAccountCode] =
    useState<string>(initialAccountCode)
  const [accounts, setAccounts] = useState<ChartOfAccount[]>([])

  async function fetchChartOfAccounts() {
    const fetchedAccounts = await getAllCoa()
    if (fetchedAccounts.error || !fetchedAccounts.data) {
      console.error('Error getting chart of accounts:', fetchedAccounts.error)
      toast({
        title: 'Error',
        description:
          fetchedAccounts.error?.message || 'Failed to get chart of accounts',
      })
    } else {
      setAccounts(fetchedAccounts.data)
    }
  }

  useEffect(() => {
    fetchChartOfAccounts()

    // Only set dates if they are valid
    if (initialFromDate) {
      setFromDate(initialFromDate)
    }
    if (initialToDate) {
      setToDate(initialToDate)
    }
    if (initialAccountCode) {
      setSelectedAccountCode(initialAccountCode)
    }

    // Trigger search automatically if we have all required values
    if (initialFromDate && initialToDate && initialAccountCode) {
      onSearch(Number(initialAccountCode), initialFromDate, initialToDate)
    }
  }, [initialFromDate, initialToDate, initialAccountCode])

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select both dates',
      })
      return
    }

    if (new Date(toDate) < new Date(fromDate)) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'To Date must be greater than From Date',
      })
      return
    }

    if (!selectedAccountCode) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select an account',
      })
      return
    }

    onSearch(Number(selectedAccountCode), fromDate, toDate)
  }

  return (
    <div className="flex items-center justify-between gap-4 p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-4 p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">From Date:</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">To Date:</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
        <Select
          value={selectedAccountCode}
          onValueChange={setSelectedAccountCode}
          defaultValue={initialAccountCode}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <SelectItem
                  key={account.accountId}
                  value={account.accountId.toString()}
                >
                  {account.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="default" disabled>
                No accounts available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Show</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={generatePdf}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-900 hover:bg-purple-200"
        >
          <FileText className="h-4 w-4" />
          <span className="font-medium">PDF</span>
        </Button>
        <Button
          onClick={generateExcel}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-900 hover:bg-green-200"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2V8H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 13H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 17H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9H8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-medium">Excel</span>
        </Button>
      </div>
    </div>
  )
}
