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
import { BankAccount } from '@/utils/type'
import { getAllBankAccounts } from '@/api/bank-accounts-api'

interface BankLedgerFindProps {
  onSearch: (bankaccount: number, fromdate: string, todate: string) => void
}

export default function BankLedgerFind({ onSearch }: BankLedgerFindProps) {
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
  const [selectedAccountId, setSelectedAccountId] = useState<string>('')
  const [accounts, setAccounts] = useState<BankAccount[]>([])

  async function fetchBankAccounts() {
    const fetchedAccounts = await getAllBankAccounts()
    if (fetchedAccounts.error || !fetchedAccounts.data) {
      console.error('Error getting bank account:', fetchedAccounts.error)
      toast({
        title: 'Error',
        description:
          fetchedAccounts.error?.message || 'Failed to get bank accounts',
      })
    } else {
      setAccounts(fetchedAccounts.data)
    }
  }

  useEffect(() => {
    fetchBankAccounts()
  }, [])

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

    if (!selectedAccountId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a bank account',
      })
      return
    }

    onSearch(parseInt(selectedAccountId, 10), fromDate, toDate)
  }

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
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
        value={selectedAccountId}
        onValueChange={(value) => setSelectedAccountId(value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select bank account" />
        </SelectTrigger>
        <SelectContent>
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <SelectItem
                key={account.id}
                value={account.id.toString()}
              >
                {account.accountName}-{account.accountNumber}-{account.bankName}-{account.branchName}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="default" disabled>
              No bank accounts available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      <Button onClick={handleSearch}>Show</Button>
    </div>
  )
}

