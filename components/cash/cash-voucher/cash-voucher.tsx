'use client'

import React, { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import {
  createJournalEntryWithDetails,
  getAllChartOfAccounts,
  getAllDepartments,
  getAllResPartners,
  getAllVoucher,
} from '@/api/vouchers-api'
import { toast } from '@/hooks/use-toast'
import {
  type AccountsHead,
  type CompanyFromLocalstorage,
  type CostCenter,
  type FormData,
  type GetDepartment,
  type JournalEntryWithDetails,
  JournalEntryWithDetailsSchema,
  type JournalQuery,
  type JournalResult,
  type LocationFromLocalstorage,
  type ResPartner,
  type User,
  type Voucher,
  VoucherTypes,
} from '@/utils/type'
import { getAllCostCenters } from '@/api/cost-centers-api'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import CashVoucherMaster from './cash-voucher-master'
import CashVoucherDetails from './cash-voucher-details'
import VoucherList from '@/components/voucher-list/voucher-list'

export default function CashVoucher() {
  const router = useRouter()
  const [voucherGrid, setVoucherGrid] = React.useState<JournalResult[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [companies, setCompanies] = React.useState<CompanyFromLocalstorage[]>(
    []
  )
  const [locations, setLocations] = React.useState<LocationFromLocalstorage[]>(
    []
  )
  const [vouchers, setVouchers] = React.useState<JournalEntryWithDetails[]>([])
  const [voucherList, setVoucherList] = useState<Voucher[]>([])
  const [formData, setFormData] = useState<FormData>({
    date: '',
    company: '',
    location: '',
    currency: '',
  })
  const [isLoading, setIsLoading] = useState(true)

  const [chartOfAccounts, setChartOfAccounts] = React.useState<AccountsHead[]>(
    []
  )
  const [costCenters, setCostCenters] = React.useState<CostCenter[]>([])
  const [departments, setDepartments] = React.useState<GetDepartment[]>([])
  const [partners, setPartners] = React.useState<ResPartner[]>([])
  const [filteredChartOfAccounts, setFilteredChartOfAccounts] = React.useState<
    AccountsHead[]
  >([])
  const [cashCoa, setCashCoa] = React.useState<AccountsHead[]>([])
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true)
  const [isLoadingLocations, setIsLoadingLocations] = useState(true)
  const [isLoadingPartners, setIsLoadingPartners] = useState(true)
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true)
  const [isLoadingCostCenters, setIsLoadingCostCenters] = useState(true)
  const linkGenerator = (voucherId: number) =>
    `/voucher-list/single-voucher-details/${voucherId}?voucherType=${VoucherTypes.CashVoucher}`

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser')
    setIsLoadingCompanies(true)
    setIsLoadingLocations(true)
    try {
      if (userStr) {
        const userData = JSON.parse(userStr)
        setUser(userData)
        setCompanies(userData.userCompanies || [])
        setLocations(userData.userLocations || [])
        if (!userData.voucherTypes.includes('Cash Voucher')) {
          router.push('/unauthorized-access')
        }
      } else {
        router.push('/unauthorized-access')
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load user data',
      })
    } finally {
      // setIsLoadingCompanies(false)
      // setIsLoadingLocations(false)
      setIsLoading(false)
    }
  }, [router]) // Added router to dependencies

  function getCompanyIds(data: CompanyFromLocalstorage[]): number[] {
    return data.map((company) => company.company.companyId)
  }
  function getLocationIds(data: LocationFromLocalstorage[]): number[] {
    return data.map((location) => location.location.locationId)
  }

  async function getallVoucher(company: number[], location: number[]) {
    try {
      const voucherQuery: JournalQuery = {
        date: new Date().toISOString().split('T')[0],
        companyId: company,
        locationId: location,
        voucherType: VoucherTypes.CashVoucher,
      }
      const response = await getAllVoucher(voucherQuery)
      if (!response.data) {
        throw new Error('No data received from server')
      }
      setVoucherGrid(Array.isArray(response.data) ? response.data : [])
      console.log('Voucher data:', response.data)
    } catch (error) {
      console.error('Error getting Voucher Data:', error)
      setVoucherGrid([])
      throw error
    }
  }
  React.useEffect(() => {
    const fetchVoucherData = async () => {
      setIsLoading(true)
      try {
        const mycompanies = getCompanyIds(companies)
        const mylocations = getLocationIds(locations)
        await getallVoucher(mycompanies, mylocations)
      } catch (error) {
        console.error('Error fetching voucher data:', error)
        toast({
          title: 'Error',
          description: 'Failed to load voucher data. Please try again.',
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (companies.length > 0 && locations.length > 0) {
      fetchVoucherData()
    }
  }, [companies, locations])
  React.useEffect(() => {
    const filteredCoa = chartOfAccounts?.filter((account) => {
      return account.isGroup === false
    })

    const isCashCoa = chartOfAccounts?.filter((account) => {
      return account.isCash === true
    })
    setFilteredChartOfAccounts(filteredCoa || [])
    setCashCoa(isCashCoa || [])
    console.log('Filtered Chart of Accounts:', filteredCoa)
    console.log('cash Chart of Accounts:', isCashCoa)
  }, [chartOfAccounts])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === 'company') {
      // Reset location when company changes
      setFormData((prev) => ({ ...prev, location: '' }))
      // Find the selected company and update locations
      const selectedCompany = companies.find(
        (c: any) => c.companyName === value
      )
      if (selectedCompany) {
        setLocations(
          locations.filter(
            (l) => l.location.companyId === selectedCompany.company.companyId
          )
        )
      }
    }
  }

  useEffect(() => {
    fetchChartOfAccounts()
    fetchgetAllCostCenters()
    fetchgetResPartner()
    fetchDepartments()
  }, [])

  async function fetchChartOfAccounts() {
    setIsLoadingAccounts(true)
    try {
      const response = await getAllChartOfAccounts()
      if (!response.data) {
        throw new Error('No data received')
      }
      console.log('Fetched Chart of Accounts:', response.data)
      setChartOfAccounts(response.data)
    } catch (error) {
      console.error('Error getting chart of accounts:', error)
      toast({
        title: 'Error',
        description: 'Failed to load chart of accounts',
      })
      setChartOfAccounts([])
    } finally {
      setIsLoadingAccounts(false)
    }
  }

  async function fetchDepartments() {
    setIsLoadingAccounts(true)
    try {
      const response = await getAllDepartments()
      if (!response.data) {
        throw new Error('No data received')
      }
      setDepartments(response.data)
    } catch (error) {
      console.error('Error getting chart of accounts:', error)
      toast({
        title: 'Error',
        description: 'Failed to load chart of accounts',
      })
      setDepartments([])
    } finally {
      setIsLoading(false)
    }
  }

  //res partner

  //res partner
  async function fetchgetAllCostCenters() {
    setIsLoadingCostCenters(true)
    try {
      const response = await getAllCostCenters()
      if (!response.data) {
        throw new Error('No data received')
      }
      setCostCenters(response.data)
    } catch (error) {
      console.error('Error getting cost centers:', error)
      toast({
        title: 'Error',
        description: 'Failed to load cost centers',
      })
      setCostCenters([])
    } finally {
      setIsLoadingCostCenters(false)
    }
  }

  async function fetchgetResPartner() {
    setIsLoadingPartners(true)
    try {
      const response = await getAllResPartners()
      if (!response.data) {
        throw new Error('No data received')
      }
      setPartners(response.data)
    } catch (error) {
      console.error('Error getting partners:', error)
      toast({
        title: 'Error',
        description: 'Failed to load partners',
      })
      setPartners([])
    } finally {
      setIsLoadingPartners(false)
    }
  }

  const form = useForm<JournalEntryWithDetails>({
    resolver: zodResolver(JournalEntryWithDetailsSchema),
    defaultValues: {
      journalEntry: {
        date: new Date().toISOString().split('T')[0],
        journalType: '',
        companyId: 0,
        locationId: 0,
        currencyId: 0,
        amountTotal: 0,
        notes: '',
        createdBy: 0,
      },
      journalDetails: [
        {
          accountId: cashCoa[0]?.accountId,
          costCenterId: null,
          departmentId: null,
          debit: 0,
          credit: 0,
          analyticTags: null,
          taxId: null,
          resPartnerId: null,
          notes: '',
          type: 'Payment',
          createdBy: 0,
        },
      ],
    },
  })
  const onSubmit = async (
    values: z.infer<typeof JournalEntryWithDetailsSchema>,
    status: 'Draft' | 'Posted'
  ) => {
    console.log('Before Any edit', values)
    const userStr = localStorage.getItem('currentUser')
    if (userStr) {
      const userData = JSON.parse(userStr)
      console.log('Current userId from localStorage:', userData.userId)
      setUser(userData)
    }
    // Calculate the total amount
    const totalAmount = values.journalDetails.reduce(
      (sum, detail) => sum + (detail.debit || 0) + (detail.credit || 0),
      0
    )
    // Update the total Amount
    const updatedValues = {
      ...values,
      journalEntry: {
        ...values.journalEntry,
        state: status === 'Draft' ? 0 : 1, // 0 for Draft, 1 for Posted
        notes: values.journalEntry.notes || '', // Ensure notes is always a string
        journalType: 'Cash Voucher',
        amountTotal: totalAmount, // Set the calculated total amount
        createdBy: user?.userId || 0,
      },
      journalDetails: values.journalDetails.map((detail) => ({
        ...detail,
        notes: detail.notes || '', // Ensure notes is always a string for each detail
        createdBy: user?.userId || 0,
      })),
    }
    console.log('After Adding created by', updatedValues)
    /// To add new row for Bank Transaction on JournalDetails
    const updateValueswithCash = {
      ...updatedValues,
      journalDetails: [
        ...updatedValues.journalDetails, // Spread existing journalDetails
        {
          accountId: cashCoa[0].accountId, //chart of accounts is cash filter by accountType will enter in database, (work in progress)
          costCenterId: null,
          departmentId: null,
          debit: updatedValues.journalDetails.reduce(
            (sum, detail) =>
              sum + (detail.type === 'Receipt' ? detail.credit : 0),
            0
          ),
          credit: updatedValues.journalDetails.reduce(
            (sum, detail) =>
              sum + (detail.type === 'Payment' ? detail.debit : 0),
            0
          ),
          analyticTags: null,
          taxId: null,
          resPartnerId: null,
          bankaccountid: null,
          notes: updatedValues.journalEntry.notes || '', // Ensure notes is always a string
          createdBy: user?.userId || 0,
        },
      ],
    }

    console.log(
      'Submitted values:',
      JSON.stringify(updateValueswithCash, null, 2)
    )
    const response = await createJournalEntryWithDetails(updateValueswithCash) // Calling API to Enter at Generate
    if (response.error || !response.data) {
      toast({
        title: 'Error',
        description: response.error?.message || 'Error creating Journal',
      })
    } else {
      const mycompanies = getCompanyIds(companies)
      const mylocations = getLocationIds(locations)
      getallVoucher(mycompanies, mylocations)
      console.log('Voucher is created successfully', response.data)
      toast({
        title: 'Success',
        description: 'Voucher is created successfully',
      })
      form.reset({
        journalEntry: {
          date: new Date().toISOString().split('T')[0],
          journalType: '',
          companyId: 0,
          locationId: 0,
          currencyId: 0,
          amountTotal: 0,
          notes: '',
          createdBy: 0,
        },
        journalDetails: [
          {
            accountId: cashCoa[0]?.accountId,
            costCenterId: null,
            departmentId: null,
            debit: 0,
            credit: 0,
            analyticTags: null,
            taxId: null,
            resPartnerId: null,
            notes: '',
            type: 'Payment',
            createdBy: 0,
          },
        ],
      })
      remove()
      append({
        accountId: cashCoa[0]?.accountId,
        costCenterId: null,
        departmentId: null,
        debit: 0,
        credit: 0,
        analyticTags: null,
        taxId: null,
        resPartnerId: null,
        notes: '',
        type: 'Payment',
        createdBy: 0,
      })
    }
  }
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'journalDetails',
  })

  const addDetailRow = () => {
    append({
      accountId: cashCoa[0].accountId,
      costCenterId: null,
      departmentId: null,
      debit: 0,
      credit: 0,
      analyticTags: null,
      taxId: null,
      resPartnerId: null,
      notes: '',
      type: 'Payment',
      createdBy: 0,
    })
  }

  const handleDelete = (voucherNo: string) => {
    setVoucherList(voucherList.filter((v) => v.voucherno !== voucherNo))
  }

  const handleReverse = (voucherno: string) => {
    setVoucherList(
      voucherList.map((v) =>
        v.voucherno === voucherno ? { ...v, status: 'Draft' } : v
      )
    )
  }

  const handlePost = (voucherno: string) => {
    setVoucherList(
      voucherList.map((v) =>
        v.voucherno === voucherno ? { ...v, status: 'Posted' } : v
      )
    )
  }

  const columns = [
    { key: 'voucherno' as const, label: 'Voucher No.' },
    { key: 'companyname' as const, label: 'Company Name' },
    { key: 'currency' as const, label: 'Currency' },
    { key: 'location' as const, label: 'Location' },
    { key: 'date' as const, label: 'Date' },
    { key: 'notes' as const, label: 'Remarks' },
    { key: 'totalamount' as const, label: 'Total Amount' },
    { key: 'state' as const, label: 'Status' },
  ]

  return (
    <div className="w-full mx-auto">
      <div className="w-full mb-10 p-8">
        <h1 className="text-2xl font-bold mb-6">Cash Vouchers</h1>

        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <CashVoucherMaster
              form={form}
              companies={companies}
              locations={locations}
            />

            <CashVoucherDetails
              form={form}
              fields={fields}
              filteredChartOfAccounts={filteredChartOfAccounts}
              costCenters={costCenters}
              departments={departments}
              partners={partners}
              addDetailRow={addDetailRow}
              onSubmit={onSubmit}
            />

            <div className="mb-6">
              <VoucherList
                vouchers={voucherGrid}
                columns={columns}
                isLoading={isLoading}
                linkGenerator={linkGenerator}
                itemsPerPage={10}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
