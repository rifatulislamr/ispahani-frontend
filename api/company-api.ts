import { fetchApi } from '@/utils/http'
import { z } from 'zod'

//Create Company Schema
export const companySchema = z.object({
   //companyId: z.number(),
  companyName: z.string().min(1, 'Company name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  taxId: z.string().optional(),
  currencyId: z.number(),
  logo: z.string().optional(),
  parentCompanyId: z.number().nullable(),
  locationId: z.number().optional(),
})

// //Get company type

export interface CompanyType {
  companyId: number
  companyName: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  phone: string
  email?: string // optional or empty string
  website?: string // optional or empty string
  taxId?: string
  currencyId: number
  logo?: string
  parentCompanyId: number | null
  locationId?: number
}



export const locationSchema = z.object({
  // locationId: z.number(),
  companyId: z.number(),
  branchName: z.string().min(1, 'Branch name is required'),
  address: z.string().min(1, 'Address is required'),
})

// export type CompanyType = z.infer<typeof companySchema>

export async function createCompany(
  companyData: z.infer<typeof companySchema>,
  locations: string[]
) {
  console.log('API: Creating company with data:', companyData)

  const response = await fetch(
    'http://localhost:4000/api/company/create-company-location',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companydata: companyData,
        address: locations,
        branchName: locations,
      }),
    }
  )

  console.log('API: Company creation response status:', response.status)
  const data = await response.json()
  console.log('API: Company creation response data:', data)

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create company')
  }

  return data
}

//get all companies api
export async function getAllCompany() {
  return fetchApi<CompanyType[]>({
    url: 'api/company/get-all-companies',
    method: 'GET',
  })
}

// export async function createCompany(
//   companyData: z.infer<typeof companySchema>,
//   locations: string[]
// ) {
//   return fetchApi({
//     url: 'api/company/create-company-location',
//     method: 'POST',
//     body: { companyData, locations },
//   })
// }
