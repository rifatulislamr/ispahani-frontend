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
import { FolderOpen } from 'lucide-react'

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

const ExpenseInfoListDoc: React.FC<VehicleInformationListProps> = ({
  onAddVehicle,
}) => {
  const [feeItems, setFeeItems] = useState<FeeItem[]>([
    {
      id: 1,
      particular: 'Tax Token Fee',
      remarks: 'Annual tax token renewal fee',
      fromDate: '10/02/2025',
      toDate: '10/02/2026',
      amount: '4,490.00',
    },
    {
      id: 2,
      particular: 'Route Permit Fee',
      remarks: 'Annual route permit renewal charges',
      fromDate: '13/03/2025',
      toDate: '12/03/2026',
      amount: '12,732.00',
    },
    {
      id: 3,
      particular: 'Misc Expenses',
      remarks: 'General maintenance and repairs',
      fromDate: '13/03/2025',
      toDate: '12/03/2026',
      amount: '4,000.00',
    },
    {
      id: 4,
      particular: '',
      remarks: 'Pending expense entry',
      fromDate: '',
      toDate: '',
      amount: '',
    },
    {
      id: 5,
      particular: '',
      remarks: 'Pending expense entry',
      fromDate: '',
      toDate: '',
      amount: '',
    },
    {
      id: 6,
      particular: '',
      remarks: 'Pending expense entry',
      fromDate: '',
      toDate: '',
      amount: '',
    },
    {
      id: 7,
      particular: '',
      remarks: 'Pending expense entry',
      fromDate: '',
      toDate: '',
      amount: '',
    },
    {
      id: 8,
      particular: '',
      remarks: 'Pending expense entry',
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
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FolderOpen className="text-amber-600" />
          Expense Document List
        </h1>
        <Button
          className="bg-yellow-400 hover:bg-yellow-500 text-black"
          onClick={onAddVehicle}
        >
          ADD
        </Button>
      </div>
      <div className="rounded-md border mx-7 flex justify-center">
        <Table className="shadow-md ">
          <TableHeader className="bg-amber-100 shadow-md">
            <TableRow>
              <TableHead className="text-center font-bold  border ">
                Particular
              </TableHead>
              <TableHead className="text-center font-bold  border">
                Remarks
              </TableHead>
              <TableHead className="text-center font-bold  border">
                From Date
              </TableHead>
              <TableHead className="text-center font-bold  border">
                To Date
              </TableHead>
              <TableHead className="text-center font-bold  border">
                Amount
              </TableHead>
              <TableHead className="text-center font-bold  border">
                Action
              </TableHead>
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
                <TableCell className="text-center border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpdate(item.id)}
                    className=" hover:text-blue-600 hover:bg-gray-300"
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}{' '}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ExpenseInfoListDoc
