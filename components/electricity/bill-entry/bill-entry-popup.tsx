'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  CreateElectricityBillSchema,
  CreateElectricityBillType,
  GetElectricityMeterType,
} from '@/utils/type'
import { createBillEntry } from '@/api/bill-entry-api'
import { toast } from '@/hooks/use-toast'
import { getMeterEntry } from '@/api/meter-entry-api'

interface MeterEntryPopUpProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onCategoryAdded: () => void
  fetchBillEntry: () => void
}

const BillEntryPopUp: React.FC<MeterEntryPopUpProps> = ({
  isOpen,
  onOpenChange,
  onCategoryAdded,
  fetchBillEntry,
}) => {
  const form = useForm<CreateElectricityBillType>({
    resolver: zodResolver(CreateElectricityBillSchema),
    defaultValues: {
      billId: 0,
      meterNo: 0,
      amount: 0,
      billDate: '',
      payment: 0,
    },
  })

  const [meterEntry, setMeterEntry] = React.useState<GetElectricityMeterType[]>(
    []
  )

  const onSubmit = async (data: CreateElectricityBillType) => {
    // Log the form data to inspect it before submission
    console.log('Form Data:', data)

    // Convert fields to proper types
    const submitData = {
      ...data,
      billId: Number(data.billId),
      meterNo: Number(data.meterNo),
      amount: Number(data.amount),
      payment: Number(data.payment),
    }

    try {
      const response = await createBillEntry(submitData)
      console.log('Response:', response.data)
      if (response.data) {
        toast({
          title: 'Success',
          description: 'Meter entry created successfully',
        })
        fetchBillEntry()
        onCategoryAdded()
        onOpenChange(false)

        form.reset()
      }
    } catch (error: any) {
      // Check if error has a response from the server
      if (error.response && error.response.data) {
        console.error('API Error Details:', error.response.data)
      } else {
        console.error('API Error Message:', error.message)
      }
      toast({
        title: 'Error',
        description:
          'Failed to create meter entry. Please check the console for details.',
        variant: 'destructive',
      })
    }
  }

  const fetchMeterEntry = async () => {
    const response = await getMeterEntry()
    setMeterEntry(response.data ?? [])
    console.log('🚀 ~get meter entry data :', response)
  }

  useEffect(() => {
    fetchMeterEntry()
  }, [])

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Meter Entry Input</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="billId"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Bill ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => onChange(Number(e.target.value))}
                        placeholder="Enter bill ID"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meterNo"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Meter No</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                      >
                        <option value="">Select Meter</option>
                        {meterEntry.map((meter) => (
                          <option key={meter.meterid} value={meter.meterid}>
                            {meter.meterName}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split('T')[0]
                            : ''
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Bill Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => onChange(Number(e.target.value))}
                        placeholder="Enter bill amount"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Payment Type</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 border rounded"
                        onChange={(e) => onChange(Number(e.target.value))}
                        value={field.value}
                      >
                        <option value={0}>Prepaid</option>
                        <option value={1}>Postpaid</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" onClick={() => onOpenChange(false)}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BillEntryPopUp
