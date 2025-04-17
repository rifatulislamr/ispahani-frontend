'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { JournalVoucherPopup } from './journal-voucher-popup'
import {
  type CompanyFromLocalstorage,
  type JournalEntryWithDetails,
  type JournalQuery,
  JournalResult,
  type LocationFromLocalstorage,
  VoucherTypes,
} from '@/utils/type'
import { toast } from '@/hooks/use-toast'
import {
  createJournalEntryWithDetails,
  getAllVoucher,
} from '@/api/journal-voucher-api'
import VoucherList from '@/components/voucher-list/voucher-list'

export default function VoucherTable() {
  const [vouchers, setVouchers] = useState<JournalResult[]>([])
  const [companies, setCompanies] = useState<CompanyFromLocalstorage[]>([])
  const [locations, setLocations] = useState<LocationFromLocalstorage[]>([])
  const [userId, setUserId] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const columns = [
    { key: 'voucherno' as const, label: 'Voucher No.' },
    { key: 'date' as const, label: 'Voucher Date' },
    { key: 'notes' as const, label: 'Notes' },
    { key: 'companyname' as const, label: 'Company Name' },
    { key: 'location' as const, label: 'Location' },
    { key: 'currency' as const, label: 'Currency' },
    { key: 'state' as const, label: 'Status' },
    { key: 'totalamount' as const, label: 'Amount' },
  ]

  const linkGenerator = (voucherId: number) =>
    `/voucher-list/single-voucher-details/${voucherId}?voucherType=${VoucherTypes.JournalVoucher}`

  const fetchAllVoucher = useCallback(
    async (company: number[], location: number[]) => {
      setIsLoading(true)
      const voucherQuery: JournalQuery = {
        date: new Date().toISOString().split('T')[0],
        companyId: company,
        locationId: location,
        voucherType: VoucherTypes.JournalVoucher,
      }
      try {
        const response = await getAllVoucher(voucherQuery)
        if (response.error) {
          throw new Error(response.error.message)
        }
        console.log('API Response:', response.data)
        setVouchers(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error('Error getting Voucher Data:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch vouchers. Please try again.',
          variant: 'destructive',
        })
        setVouchers([])
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser')
    if (userStr) {
      const userData = JSON.parse(userStr)
      setUserId(userData.userId)
      setCompanies(userData.userCompanies)
      setLocations(userData.userLocations)
      console.log('Current user from localStorage:', userData.userId)

      const companyIds = getCompanyIds(userData.userCompanies)
      const locationIds = getLocationIds(userData.userLocations)
      console.log({ companyIds, locationIds })

      fetchAllVoucher(companyIds, locationIds)
    } else {
      console.log('No user data found in localStorage')
      setIsLoading(false)
    }
  }, [fetchAllVoucher])

  function getCompanyIds(data: CompanyFromLocalstorage[]): number[] {
    return data.map((company) => company.company.companyId)
  }

  function getLocationIds(data: LocationFromLocalstorage[]): number[] {
    return data.map((location) => location.location.locationId)
  }

  const handleSubmit = async (
    data: JournalEntryWithDetails,
    resetForm: () => void
  ) => {
    setIsSubmitting(true)
    console.log('Submitting voucher:', data)

    const submissionData = {
      ...data,
      journalEntry: {
        ...data.journalEntry,
        amountTotal: data.journalEntry.amountTotal,
        createdBy: userId,
      },
      journalDetails: data.journalDetails.map((detail) => ({
        ...detail,
        createdBy: userId,
        costCenterId: detail.costCenterId || null,
        departmentId: detail.departmentId || null,
      })),
    }

    console.log('Submission data:', submissionData)

    const response = await createJournalEntryWithDetails(submissionData)

    if (response.error || !response.data) {
      toast({
        title: 'Error',
        description: `${response.error?.message}`,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Success',
        description: 'Voucher created successfully',
      })
      resetForm()
      setIsPopupOpen(false)
    }

    setIsSubmitting(false)
    fetchAllVoucher(getCompanyIds(companies), getLocationIds(locations))
  }

  return (
    <div className="w-[97%] mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Journal Vouchers</h1>
        <JournalVoucherPopup
          isOpen={isPopupOpen}
          onOpenChange={setIsPopupOpen}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
      <VoucherList
        vouchers={vouchers}
        columns={columns}
        isLoading={isLoading}
        linkGenerator={linkGenerator}
        itemsPerPage={10}
      />
    </div>
  )
}
