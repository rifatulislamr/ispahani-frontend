'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { JournalVoucherMasterSection } from './journal-voucher-master-section'
import { JournalVoucherDetailsSection } from './journal-voucher-details-section'
import { JournalVoucherSubmit } from './journal-voucher-submit'
import {
  type JournalEntryWithDetails,
  JournalEntryWithDetailsSchema,
  VoucherTypes,
} from '@/utils/type'
import { Popup } from '@/utils/popup'

interface JournalVoucherPopupProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  handleSubmit: (data: JournalEntryWithDetails, resetForm: () => void) => void
  isSubmitting: boolean
}

export function JournalVoucherPopup({
  isOpen,
  onOpenChange,
  handleSubmit,
  isSubmitting,
}: JournalVoucherPopupProps) {
  const defaultValues =  useMemo(() => ({
    journalEntry: {
      date: new Date().toISOString().split('T')[0],
      journalType: VoucherTypes.JournalVoucher,
      state: 0,
      companyId: 0,
      locationId: 0,
      currencyId: 1,
      amountTotal: 0,
      createdBy: 0,
    },
    journalDetails: [
      {
        accountId: 0,
        debit: 0,
        credit: 0,
        createdBy: 0,
      },
    ],
  }), [])

  const form = useForm<JournalEntryWithDetails>({
    resolver: zodResolver(JournalEntryWithDetailsSchema),
    defaultValues,
  })

  // const resetForm = () => {
  //   form.reset(defaultValues)
  // }

  const resetForm = useCallback(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);
  

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])

  const addEntry = () => {
    const currentEntries = form.getValues('journalDetails')
    form.setValue('journalDetails', [
      ...currentEntries,
      {
        accountId: 0,
        debit: 0,
        credit: 0,
        createdBy: 0,
      },
    ])
  }

  const removeEntry = (index: number) => {
    const currentEntries = form.getValues('journalDetails')
    if (currentEntries.length > 1) {
      form.setValue(
        'journalDetails',
        currentEntries.filter((_, i) => i !== index)
      )
    }
  }

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name?.startsWith('journalDetails')) {
        const totalDebit =
          value.journalDetails?.reduce(
            (sum, detail) => sum + (detail?.debit || 0),
            0
          ) || 0
        const totalCredit =
          value.journalDetails?.reduce(
            (sum, detail) => sum + (detail?.credit || 0),
            0
          ) || 0
        const amountTotal = Math.max(totalDebit, totalCredit)
        form.setValue('journalEntry.amountTotal', amountTotal)
        console.log('amountTotal from popup:', amountTotal)
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = (data: JournalEntryWithDetails) => {
    handleSubmit(data, resetForm)
  }

  return (
    <>
      <Button onClick={() => onOpenChange(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add
      </Button>
      <Popup
        isOpen={isOpen}
        onClose={() => onOpenChange(false)}
        title="Journal Voucher"
        size="max-w-6xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <JournalVoucherMasterSection form={form} />
            <JournalVoucherDetailsSection
              form={form}
              onAddEntry={addEntry}
              onRemoveEntry={removeEntry}
            />
            <JournalVoucherSubmit
              form={form}
              onSubmit={form.handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
            />
          </form>
        </Form>
      </Popup>
    </>
  )
}
