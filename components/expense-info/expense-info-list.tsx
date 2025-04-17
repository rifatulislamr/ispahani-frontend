'use client'

import React from 'react'

import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'

interface FeeItem {
  id: number
  particular: string
  remarks: string
  fromDate: string
  toDate: string
  amount: string
}

interface VehicleInformationListProps {
  onAddVehicle: () => void
}

const ExpenseInfoList: React.FC<VehicleInformationListProps> = ({
  onAddVehicle,
}) => {
  const [feeItems, setFeeItems] = useState<FeeItem[]>([
    {
      id: 1,
      particular: 'Tax Token Fee',
      remarks: '',
      fromDate: '10/02/2025',
      toDate: '10/02/2026',
      amount: '4,490.00',
    },
    {
      id: 2,
      particular: 'Route Permit Fee',
      remarks: '',
      fromDate: '13/03/2025',
      toDate: '12/03/2026',
      amount: '12,732.00',
    },
    {
      id: 3,
      particular: 'Misc Expenses',
      remarks: '',
      fromDate: '13/03/2025',
      toDate: '12/03/2026',
      amount: '4,000.00',
    },
    {
      id: 4,
      particular: '',
      remarks: '',
      fromDate: '',
      toDate: '',
      amount: '',
    },
    {
      id: 5,
      particular: '',
      remarks: '',
      fromDate: '',
      toDate: '',
      amount: '',
    },
    {
      id: 6,
      particular: '',
      remarks: '',
      fromDate: '',
      toDate: '',
      amount: '',
    },
    {
      id: 7,
      particular: '',
      remarks: '',
      fromDate: '',
      toDate: '',
      amount: '',
    },
    {
      id: 8,
      particular: '',
      remarks: '',
      fromDate: '',
      toDate: '',
      amount: '',
    },
  ])

  const handleUpdate = (id: number) => {
    console.log(`Update item with id: ${id}`)
    // Implement update logic here
  }
  return (
    <div>
      <div className="flex justify-between items-center  mb-4 mx-7 mt-10">
        <h1 className="text-2xl font-bold">Vehicle Information List</h1>
        <Button onClick={onAddVehicle}>ADD</Button>
      </div>
      <div className="rounded-md border mx-7 flex justify-center">
        <Table>
          <TableHeader className="bg-slate-200">
            <TableRow>
              <TableHead className="text-center font-bold text-blue-800 border">
                Particular
              </TableHead>
              <TableHead className="text-center font-bold text-blue-800 border">
                Remarks
              </TableHead>
              <TableHead className="text-center font-bold text-blue-800 border">
                From Date
              </TableHead>
              <TableHead className="text-center font-bold text-blue-800 border">
                To Date
              </TableHead>
              <TableHead className="text-center font-bold text-blue-800 border">
                Amount
              </TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feeItems.map((item) => (
              <TableRow key={item.id} className="border">
                <TableCell className="border">{item.particular}</TableCell>
                <TableCell className="border">{item.remarks}</TableCell>
                <TableCell className="text-center border">
                  {item.fromDate}
                </TableCell>
                <TableCell className="text-center border">
                  {item.toDate}
                </TableCell>
                <TableCell className="text-right border font-medium">
                  {item.amount && (
                    <div className="flex justify-end">
                      <div className="mr-1">$</div>
                      <div>{item.amount}</div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center bg-gray-200 border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpdate(item.id)}
                    className="text-blue-800 hover:text-blue-600 hover:bg-gray-300"
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ExpenseInfoList
