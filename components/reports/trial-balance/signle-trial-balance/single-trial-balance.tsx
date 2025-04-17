'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import SingleTrialBalanceFind from './single-trial-balance-find'
import SingleTrialBalanceList from './single-trial-balance-list'
import type { GeneralLedgerType } from '@/utils/type'
import { getGeneralLedgerByDate } from '@/api/general-ledger-api'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { usePDF } from 'react-to-pdf'

function formatDateString(dateStr: string) {
  try {
    // First decode the URL-encoded string
    const decodedStr = decodeURIComponent(dateStr).replace(/\+/g, ' ')

    // Handle different date formats
    let date

    // Try parsing as ISO string first
    date = new Date(decodedStr)

    // If invalid, try parsing the specific format from the URL
    if (isNaN(date.getTime())) {
      // Parse format like "Sun Jun 30 2024"
      const parts = decodedStr.split(' ')
      if (parts.length >= 4) {
        date = new Date(`${parts[1]} ${parts[2]} ${parts[3]}`)
      }
    }

    // If still invalid, try other formats
    if (isNaN(date.getTime())) {
      // Try parsing mm/dd/yyyy
      const [month, day, year] = decodedStr.split('/')
      date = new Date(Number(year), Number(month) - 1, Number(day))
    }

    // Validate the date
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', decodedStr)
      return ''
    }

    // Format to YYYY-MM-DD
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (e) {
    console.error('Error formatting date:', e)
    return ''
  }
}

export default function SingleTrialBalance() {
  const { toPDF, targetRef } = usePDF({ filename: 'single_trial_balance.pdf' })
  const [transactions, setTransactions] = useState<GeneralLedgerType[]>([])

  // Retrieve the route parameter (item.id)
  const { id } = useParams()

  // Retrieve and process the query parameters
  const searchParams = useSearchParams()
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''

  // Format the dates
  const formattedStartDate = formatDateString(startDate)
  const formattedEndDate = formatDateString(endDate)

  console.log('Original dates:', { startDate, endDate })
  console.log('Formatted dates:', { formattedStartDate, formattedEndDate })

  const flattenData = (data: GeneralLedgerType[]) => {
    return data.map((item) => ({
      VoucherID: item.voucherid,
      VoucherNo: item.voucherno,
      AccountName: item.accountname,
      Debit: item.debit,
      Credit: item.credit,
      Notes: item.notes,
      Partner: item.partner,
      CostCenter: item.coscenter,
      Department: item.department,
    }))
  }

  const exportToExcel = (data: GeneralLedgerType[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(flattenData(data))
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Single Trial Balance')
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    })
    saveAs(blob, `${fileName}.xlsx`)
  }

  const generatePdf = () => {
    toPDF()
  }

  const generateExcel = () => {
    exportToExcel(transactions, 'single-trial-balance')
  }

  const handleSearch = async (
    accountcode: number,
    fromdate: string,
    todate: string
  ) => {
    try {
      const response = await getGeneralLedgerByDate({
        accountcode,
        fromdate,
        todate,
      })

      if (response.error) {
        console.error('Error fetching transactions:', response.error)
      } else {
        setTransactions(response.data || [])
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  useEffect(() => {
    if (id && formattedStartDate && formattedEndDate) {
      handleSearch(Number(id), formattedStartDate, formattedEndDate)
    }
  }, [id, formattedStartDate, formattedEndDate])

  return (
    <div className="space-y-4 container mx-auto mt-20">
      <SingleTrialBalanceFind
        initialAccountCode={id ? String(id) : ''}
        initialFromDate={formattedStartDate}
        initialToDate={formattedEndDate}
        onSearch={handleSearch}
        generatePdf={generatePdf}
        generateExcel={generateExcel}
      />
      <SingleTrialBalanceList
        transactions={transactions}
        targetRef={targetRef}
      />
    </div>
  )
}
