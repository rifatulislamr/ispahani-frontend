'use client'

import { useState } from 'react'
import GeneralLedgerFind from './general-ledger-find'
import GeneralLedgerList from './general-ledger-list'
import { GeneralLedgerType } from '@/utils/type'
import { getGeneralLedgerByDate } from '@/api/general-ledger-api'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { usePDF } from 'react-to-pdf'

export default function GeneralLedger() {
  const { toPDF, targetRef } = usePDF({ filename: 'general_ledger.pdf' })
  const [transactions, setTransactions] = useState<GeneralLedgerType[]>([])

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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'General Ledger')
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
    exportToExcel(transactions, 'general_ledger')
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

  return (
    <div className="space-y-4 container mx-auto mt-20">
      <GeneralLedgerFind
        onSearch={handleSearch}
        generatePdf={generatePdf}
        generateExcel={generateExcel}
      />
      <GeneralLedgerList transactions={transactions} targetRef={targetRef} />
    </div>
  )
}
