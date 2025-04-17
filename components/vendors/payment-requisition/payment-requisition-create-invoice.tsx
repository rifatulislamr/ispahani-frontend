'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { createInvoice, getAllVendors } from '@/api/payment-requisition-api'
import { useForm } from 'react-hook-form'
import { CustomCombobox } from '@/utils/custom-combobox'
import { ResPartner } from '@/utils/type'

// Define the schema for form validation
const createInvoiceSchema = z.object({
  poId: z.number().int().positive(),
  vendorId: z.number().int().positive(),
  invoiceNumber: z.string().max(50),
  invoiceDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable(),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable(),
  currency: z.string().max(10),
  totalAmount: z.number().nonnegative(),
  vatAmount: z.number().nonnegative().optional(),
  taxAmount: z.number().nonnegative().optional(),
  tdsAmount: z.number().nonnegative().optional(),
  discountAmount: z.number().nonnegative().optional(),
  paymentStatus: z.enum(['Pending', 'Partially Paid', 'Paid', 'Cancelled']),
  paymentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable(),
  approvalStatus: z.enum(['Pending', 'Approved', 'Rejected']),
  approvedBy: z.number().int().positive().optional().nullable(),
  attachmentUrl: z.string().url().optional(),
  createdBy: z.number(),
})

// Type for the form values
type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>

interface PaymentRequisitionCreateInvoiceFormProps {
  requisition?: any
  token?: string
  onSuccess?: () => void
}

const PaymentRequisitionCreateInvoiceForm = ({
  requisition,
  onSuccess,
}: PaymentRequisitionCreateInvoiceFormProps) => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userId, setUserId] = useState(null)

  // Get current user ID from localStorage
  const getCurrentUserId = (): number => {
    try {
    } catch (error) {
      console.error('Error getting user ID:', error)
    }
    return 1 // Default user ID if not found
  }

  // Default values for the form
  const defaultValues: Partial<CreateInvoiceFormValues> = {
    poId: requisition?.id || 0,
    vendorId: requisition?.vendorId || 0,
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    currency: 'USD',
    totalAmount: requisition?.amount || 0,
    vatAmount: 0,
    taxAmount: 0,
    tdsAmount: 0,
    discountAmount: 0,
    paymentStatus: 'Pending',
    paymentDate: null,
    approvalStatus: 'Pending',
    approvedBy: null,
    attachmentUrl: '',
    createdBy: getCurrentUserId(),
  }

  const getAuthToken = () => {
    const mainToken = localStorage.getItem('authToken')
    if (!mainToken) {
      console.error('No auth token found in localStorage')
      return null
    }

    // Check if token already has Bearer prefix
    if (mainToken.startsWith('Bearer ')) {
      return mainToken
    } else {
      return `Bearer ${mainToken}`
    }
  }

  const token = getAuthToken()
  if (!token) {
    toast({
      title: 'Authentication Error',
      description: 'You are not authenticated. Please log in again.',
      variant: 'destructive',
    })
  }

  // Initialize form
  const form = useForm<CreateInvoiceFormValues>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues,
  })

  // Handle form submission
  const onSubmit = async (data: CreateInvoiceFormValues) => {
    setIsSubmitting(true)
    try {
      if (!token) {
        throw new Error('Authentication token is missing')
      }
      const response = await createInvoice(data, token)

      if (response.error) {
        toast({
          title: 'Error',
          description: response.error.message || 'Failed to create invoice',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Success',
          description: 'Invoice created successfully',
        })

        if (onSuccess) {
          onSuccess()
        }
      }
    } catch (error) {
      console.error('Error creating invoice:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const [vendors, setVendors] = useState<ResPartner[]>([])

  async function getVendors() {
    try {
      const response = await getAllVendors()
      if (!response.data) {
        throw new Error('No data received')
      }
      setVendors(response.data)
    } catch (error) {
      console.error('Error getting partners:', error)
      toast({
        title: 'Error',
        description: 'Failed to load partners',
      })
      setVendors([])
    }
  }

  useEffect(() => {
    getVendors()
  }, [])

  return (
    <div className="space-y-6 p-4">
      <Form {...form}>
        {/* Note: We're not using a <form> element here since this component is already inside a form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* PO ID */}
            <FormField
              control={form.control}
              name="poId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Order ID*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Purchase Order ID"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    ID of the related purchase order
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vendor ID */}
            {/* <FormField
              control={form.control}
              name="vendorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor ID*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Vendor ID"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>ID of the vendor</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="vendorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor</FormLabel>
                  <FormControl>
                    <CustomCombobox
                      items={vendors.map((partner) => ({
                        id: partner.id.toString(),
                        name: partner.name || 'Unnamed Partner',
                      }))}
                      value={
                        field.value
                          ? {
                              id: field.value.toString(),
                              name:
                              vendors.find((p) => p.id === field.value)
                                  ?.name || '',
                            }
                          : null
                      }
                      onChange={(value) =>
                        field.onChange(
                          value ? Number.parseInt(value.id, 10) : null
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Invoice Number */}
            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Number*</FormLabel>
                  <FormControl>
                    <Input placeholder="INV-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Invoice Date - Using standard HTML date input */}
            <FormField
              control={form.control}
              name="invoiceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date - Using standard HTML date input */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Currency */}
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Amount */}
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* VAT Amount */}
            <FormField
              control={form.control}
              name="vatAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VAT Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tax Amount */}
            <FormField
              control={form.control}
              name="taxAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TDS Amount */}
            <FormField
              control={form.control}
              name="tdsAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TDS Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount Amount */}
            <FormField
              control={form.control}
              name="discountAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Date - Using standard HTML date input */}
            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attachment URL */}
            <FormField
              control={form.control}
              name="attachmentUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachment URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/invoice.pdf"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    URL to the invoice attachment
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Hidden field for createdBy */}
          <input type="hidden" {...form.register('createdBy')} />

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Invoice'}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default PaymentRequisitionCreateInvoiceForm
