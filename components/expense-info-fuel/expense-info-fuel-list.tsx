'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../ui/button'
import { FuelIcon } from 'lucide-react'

interface FuelExpense {
  id: string
  particular: string
  remarks: string
  previousKm: string
  presentKm: string
  runningKm: string
  costPerKm: string
  unitPrice: string
  quantity: string
  amount: string
}
interface expenseInfoFuelListProps {
  onAddVehicle: () => void
}

const ExpenseInfoFuelList: React.FC<expenseInfoFuelListProps> = ({
  onAddVehicle,
}) => {
  const [expenses, setExpenses] = useState<FuelExpense[]>([
    {
      id: '1',
      particular: 'CNG(Gas)',
      remarks: 'Service',
      previousKm: '1,77,962',
      presentKm: '1,78,012',
      runningKm: '50.00',
      costPerKm: '14.40',
      unitPrice: '43.00',
      quantity: '14.30',
      amount: '615.00',
    },
    {
      id: '2',
      particular: 'Petrol',
      remarks: 'Regular',
      previousKm: '1,78,012',
      presentKm: '1,78,112',
      runningKm: '100.00',
      costPerKm: '16.50',
      unitPrice: '110.00',
      quantity: '15.00',
      amount: '1,650.00',
    },
    {
      id: '3',
      particular: 'Diesel',
      remarks: 'Emergency',
      previousKm: '1,78,112',
      presentKm: '1,78,312',
      runningKm: '200.00',
      costPerKm: '12.75',
      unitPrice: '95.00',
      quantity: '26.84',
      amount: '2,550.00',
    },
    {
      id: '4',
      particular: 'CNG(Gas)',
      remarks: 'Regular',
      previousKm: '1,78,312',
      presentKm: '1,78,392',
      runningKm: '80.00',
      costPerKm: '13.50',
      unitPrice: '43.00',
      quantity: '25.12',
      amount: '1,080.00',
    },
  ])
  return (
    <Card className="w-full">
      <div className="flex justify-between items-center  mb-4 mx-7 mt-10">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FuelIcon className="text-amber-600" /> Expense Fuel List
        </h1>
        <Button
          className="bg-yellow-400 hover:bg-yellow-500 text-black"
          onClick={onAddVehicle}
        >
          ADD
        </Button>
      </div>
      <CardContent>
        <div className="rounded-md border">
          <Table className="shadow-md ">
            <TableHeader className="bg-amber-100 shadow-md">
              <TableRow>
                <TableHead className="w-[150px]">Particular</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>Previous (KM)</TableHead>
                <TableHead>Present (KM)</TableHead>
                <TableHead>Running(KM)</TableHead>
                <TableHead>Cost/KM(Tk)</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">
                    {expense.particular}
                  </TableCell>
                  <TableCell>{expense.remarks}</TableCell>
                  <TableCell>{expense.previousKm}</TableCell>
                  <TableCell>{expense.presentKm}</TableCell>
                  <TableCell>{expense.runningKm}</TableCell>
                  <TableCell>{expense.costPerKm}</TableCell>
                  <TableCell>{expense.unitPrice}</TableCell>
                  <TableCell>{expense.quantity}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                </TableRow>
              ))}
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={`empty-${index}`}>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default ExpenseInfoFuelList
