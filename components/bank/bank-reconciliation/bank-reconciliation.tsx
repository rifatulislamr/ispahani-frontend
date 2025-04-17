'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import type { BankAccount, BankReconciliationType } from '@/utils/type'
import { useToast } from '@/hooks/use-toast'
import {
  getAllBankAccounts,
  getBankReconciliations,
  updateBankReconciliation,
} from '@/api/bank-reconciliation-api'
import { CustomCombobox } from '@/utils/custom-combobox'
import { useForm } from 'react-hook-form'
import { Check, Edit } from 'lucide-react'

export const BankReconciliation = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [selectedBankAccount, setSelectedBankAccount] =
    useState<BankAccount | null>(null)
  const [reconciliations, setReconciliations] = useState<
    BankReconciliationType[]
  >([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const { toast } = useToast()
  const form = useForm({
    defaultValues: {
      bankAccount: '',
      fromDate: '',
      toDate: '',
    },
  })

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        setLoading(true)
        const accounts = await getAllBankAccounts()
        if (accounts.data) {
          setBankAccounts(accounts.data)
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch bank accounts',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }
    fetchBankAccounts()
  }, [toast])

  const fetchReconciliations = async (data: {
    bankAccount: string
    fromDate: string
    toDate: string
  }) => {
    if (data.bankAccount && data.fromDate && data.toDate) {
      try {
        setLoading(true)
        console.log('Fetching reconciliations with:', data) // Debug log
        const response = await getBankReconciliations(
          Number.parseInt(data.bankAccount),
          data.fromDate,
          data.toDate
        )
        console.log('Received reconciliations:', response.data) // Debug log
        setReconciliations(response.data || [])
      } catch (error) {
        console.error('Error fetching reconciliations:', error) // Debug log
        toast({
          title: 'Error',
          description: 'Failed to fetch reconciliations',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    } else {
      console.log('Missing required data:', data) // Debug log
      setReconciliations([])
    }
  }

  // Update the handleReconciliationUpdate function
  const handleReconciliationUpdate = async (
    id: number,
    reconciled: number, // Changed from boolean to number
    comments: string
  ) => {
    try {
      setLoading(true)
      // Update both reconciled status and comments in a single API call
      await updateBankReconciliation(id, reconciled, comments)

      // Update local state
      setReconciliations((prevReconciliations) =>
        prevReconciliations.map((r) =>
          r.id === id ? { ...r, reconciled, comments } : r
        )
      )
      setEditingId(null)
      toast({
        title: 'Success',
        description: 'Reconciliation updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update reconciliation',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  // Update the updateLocalReconciliation function
  const updateLocalReconciliation = (
    id: number,
    field: 'reconciled' | 'comments',
    value: any
  ) => {
    setReconciliations((prevReconciliations) =>
      prevReconciliations.map((r) =>
        r.id === id
          ? {
              ...r,
              [field]:
                field === 'reconciled'
                  ? value
                    ? 1
                    : 0 // Convert to 1 or 0 for reconciled field
                  : value,
            }
          : r
      )
    )
  }

  // Helper function to toggle edit mode for a reconciliation
  const toggleEditMode = (id: number) => {
    setEditingId(id === editingId ? null : id)
  }

  // Helper function to update local reconciliation data while editing

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(fetchReconciliations)}
        className="w-[98%] mx-auto p-4"
      >
        <div className="flex justify-between items-end mb-4 gap-4 w-fit mx-auto">
          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From Date</FormLabel>
                <Input type="date" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To Date</FormLabel>
                <Input type="date" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankAccount"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Bank Account</FormLabel>
                <CustomCombobox
                  items={bankAccounts.map((account) => ({
                    id: account.id.toString(),
                    name: `${account.bankName} - ${account.accountName} - ${account.accountNumber}`,
                  }))}
                  value={
                    selectedBankAccount
                      ? {
                          id: selectedBankAccount.id.toString(),
                          name: `${selectedBankAccount.bankName} - ${selectedBankAccount.accountName} - ${selectedBankAccount.accountNumber}`,
                        }
                      : null
                  }
                  onChange={(value) => {
                    if (!value) {
                      setSelectedBankAccount(null)
                      field.onChange(null)
                      return
                    }
                    const selected = bankAccounts.find(
                      (account) => account.id.toString() === value.id
                    )
                    setSelectedBankAccount(selected || null)
                    field.onChange(value.id)
                  }}
                  placeholder="Select bank account"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.formState.isValid}>
            Show
          </Button>
        </div>

        <Table className="mt-4 shadow-md border">
          <TableHeader className="bg-slate-200 shadow-md">
            <TableRow>
              <TableHead>Voucher ID</TableHead>
              <TableHead>Check No</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reconciled</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : selectedBankAccount && reconciliations.length > 0 ? (
              reconciliations.map((reconciliation) => (
                <TableRow key={reconciliation.id}>
                  <TableCell>{reconciliation.voucherId}</TableCell>
                  <TableCell>{reconciliation.checkNo}</TableCell>
                  <TableCell>{reconciliation.amount}</TableCell>
                  <TableCell>{reconciliation.type}</TableCell>
                  {/* Update the Checkbox in the table */}
                  <TableCell>
                    {editingId === reconciliation.id ? (
                      <Checkbox
                        checked={reconciliation.reconciled === 1}
                        onCheckedChange={(checked) =>
                          updateLocalReconciliation(
                            reconciliation.id,
                            'reconciled',
                            checked ? 1 : 0 // Convert to 1 or 0
                          )
                        }
                      />
                    ) : reconciliation.reconciled === 1 ? (
                      'Yes'
                    ) : (
                      'No'
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === reconciliation.id ? (
                      <Input
                        value={reconciliation.comments || ''}
                        onChange={(e) =>
                          updateLocalReconciliation(
                            reconciliation.id,
                            'comments',
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      reconciliation.comments || ''
                    )}
                  </TableCell>
                  <TableCell>
                    {/* Update the Button onClick handler */}
                    {editingId === reconciliation.id ? (
                      <Button
                        type="button"
                        onClick={() =>
                          handleReconciliationUpdate(
                            reconciliation.id,
                            reconciliation.reconciled ?? 0,
                            reconciliation.comments || ''
                          )
                        }
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => toggleEditMode(reconciliation.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Please select a bank account and date range, then click &quot;Show&quot;
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </form>
    </Form>
  )
}
