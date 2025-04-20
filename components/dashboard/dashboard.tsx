// 'use client'

// import React, { useState } from 'react'
// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Area,
//   AreaChart,
//   Pie,
//   PieChart,
//   Cell,
// } from 'recharts'
// import { ChevronDown } from 'lucide-react'
// import { useRouter } from 'next/router'

// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import {
//   getAllCompany,
//   getAllDepartments,
//   getCostBreakdown,
//   getExpenseData,
//   getFundPosition,
//   getGPData,
//   getIncomeData,
//   getNPData,
// } from '@/api/dashboard-api'
// import type {
//   ApproveAdvanceType,
//   Department,
//   FundPositionType,
//   GetCostBreakdownType,
//   GEtExpenseDataType,
//   GetPaymentOrder,
// } from '@/utils/type'
// import Link from 'next/link'
// import { getAllPaymentRequisition } from '@/api/payment-requisition-api'
// import { getAllAdvance } from '@/api/approve-advance-api'
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from '@radix-ui/react-hover-card'
// import { set } from 'date-fns'
// import { toast } from '@/hooks/use-toast'
// import { CustomCombobox } from '@/utils/custom-combobox'
// import { CompanyType } from '@/api/company-api'

// // Dummy data for other charts (unchanged)
// const inventoryData = [
//   { date: 'Jan 25', rawMaterials: 120, color: 45, packaging: 30 },
//   { date: 'Feb 25', rawMaterials: 130, color: 35, packaging: 25 },
//   { date: 'Mar 25', rawMaterials: 115, color: 40, packaging: 35 },
//   { date: 'Apr 25', rawMaterials: 140, color: 30, packaging: 28 },
//   { date: 'May 25', rawMaterials: 125, color: 50, packaging: 32 },
//   { date: 'Jun 25', rawMaterials: 110, color: 45, packaging: 27 },
// ]

// const costBreakdownData = [
//   { financialTag: 'Raw Material Cost', balance: 8000000 },
//   { financialTag: 'Labor Cost', balance: 5000000 },
//   { financialTag: 'Packaging Cost', balance: 3000000 },
//   { financialTag: 'Other Costs', balance: 2000000 },
// ]

// export default function Dashboard() {
//   const [fundPositionData, setFundPositionData] =
//     React.useState<FundPositionType | null>(null)
//   const [advances, setAdvances] = useState<ApproveAdvanceType[]>([])
//   const [invoices, setInvoices] = useState<GetPaymentOrder[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [expenseData, setExpenseData] = useState<GEtExpenseDataType[]>([])
//   const [expenseDataYearly, setExpenseDataYearly] = useState<
//     GEtExpenseDataType[]
//   >([])
//   const [incomeData, setIncomeData] = useState<GEtExpenseDataType[]>([])
//   const [incomeDataYearly, setIncomeDataYearly] = useState<
//     GEtExpenseDataType[]
//   >([])
//   const [gpData, setGPData] = useState<GEtExpenseDataType[]>([])
//   const [gpDataYearly, setGPDataYearly] = useState<GEtExpenseDataType[]>([])
//   const [npData, setNPData] = useState<GEtExpenseDataType[]>([])
//   const [npDataYearly, setNPDataYearly] = useState<GEtExpenseDataType[]>([])
//   const [department, setDepartments] = useState<Department[]>([])
//   const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
//     null
//   )
//   const [costBreakdown, setCostBreakdown] = useState<GetCostBreakdownType[]>([])
//   const [selectFinancialTag, setSelectFinancialTag] = useState<string>('')
//   const [getCompany, setGetCompany] = useState<CompanyType[]>([])

//   const mainToken = localStorage.getItem('authToken')
//   console.log('🚀 ~ PaymentRequisition ~ mainToken:', mainToken)
//   const token = `Bearer ${mainToken}`

//   const fetchFundPosition = React.useCallback(async () => {
//     try {
//       const data = await getFundPosition(77, '2025-02-19', '02')
//       console.log('Fetched fund position data:', data)
//       setFundPositionData(data.data)
//     } catch (error) {
//       console.error('Error fetching fund position data:', error)
//     }
//   }, [])

//   // const router = useRouter()

//   // const Revert = (financialTag: string) => {
//   //   router.push('/dashboard/asset')
//   //   if (financialTag === 'Asset') {
//   //     setSelectFinancialTag('Asset')
//   //     router.push({
//   //       pathname: '/dashboard/cost-breakdown-details',
//   //       query: { financialTag: financialTag },
//   //     })
//   //   }
//   // }

//   // Fetch Departments
//   const fetchDepartments = async () => {
//     const data = await getAllDepartments()
//     if (data.error || !data.data) {
//       console.error('Error getting departments:', data.error)
//       toast({
//         title: 'Error',
//         description: data.error?.message || 'Failed to get departments',
//       })
//     } else {
//       setDepartments(data.data)
//     }
//   }

//   const fetchRequisitions = async () => {
//     try {
//       setLoading(true)
//       const data = await getAllPaymentRequisition({
//         companyId: 75,
//         token: token,
//       })
//       const filteredInvoices =
//         data.data?.filter((req) => req.status === 'Invoice Created') || []
//       setInvoices(filteredInvoices)
//       console.log('🚀 ~ fetchRequisitions ~ data:', data.data)
//     } catch (err) {
//       setError('Failed to fetch requisitions')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchAdvances = async () => {
//     try {
//       setLoading(true)
//       setError(null) // Reset error state

//       const data = await getAllAdvance(token)
//       setAdvances(Array.isArray(data?.data) ? data.data : []) // Ensure it's always an array
//       console.log('🚀 ~ fetchAdvances ~ data.data:', data.data)
//     } catch (err) {
//       console.error('Error fetching advances:', err)
//       setError('Failed to fetch advance requests')
//       setAdvances([]) // Ensure UI still works
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Get All company function
//   const fetchAllCompany = async () => {
//     const response = await getAllCompany()
//     console.log('🚀 ~ fetchAllCompany ~ response from dashboard :', response)
//     setGetCompany(response.data || [])
//   }

//   //  Get Expense data monthly
//   const fetchExpenseData = async () => {
//     const companyId = 75 // Example companyId
//     const startDate = '2025-02-01' // Example startDate
//     const endDate = '2025-03-31' // Example endDate

//     const response = await getExpenseData(companyId, startDate, endDate, token)
//     if (response.data) {
//       setExpenseData(
//         Array.isArray(response.data) ? response.data : [response.data]
//       )
//     } else {
//       setExpenseData([])
//     }
//     console.log('🚀 ~ getExpectedRevenue ~ response:', response)
//   }

//   //  Get Expense data yearly
//   const fetchExpenseDataYearly = async () => {
//     const companyId = 75 // Example companyId
//     const startDate = '' // Example startDate
//     const endDate = '' // Example endDate

//     const response = await getExpenseData(companyId, startDate, endDate, token)
//     if (response.data) {
//       setExpenseDataYearly(
//         Array.isArray(response.data) ? response.data : [response.data]
//       )
//     } else {
//       setExpenseDataYearly([])
//     }
//     console.log('🚀 ~ getExpectedRevenue ~ response:', response)
//   }

//   // Get Income Data
//   const fetchIncomeData = async () => {
//     const companyId = 75 // Example companyId
//     const startDate = '2025-02-01' // Example startDate
//     const endDate = '2025-03-31' // Example endDate

//     const response = await getIncomeData(companyId, startDate, endDate, token)
//     if (response.data) {
//       setIncomeData(
//         Array.isArray(response.data) ? response.data : [response.data]
//       )
//     } else {
//       setIncomeData([])
//     }
//     console.log('🚀 ~ getIncomeData  ~ response:', response)
//   }

//   // Get Income Data  yearly
//   const fetchIncomeDataYearly = async () => {
//     const companyId = 75 // Example companyId
//     const startDate = '' // Example startDate
//     const endDate = '' // Example endDate

//     const response = await getIncomeData(companyId, startDate, endDate, token)
//     if (response.data) {
//       setIncomeDataYearly(
//         Array.isArray(response.data) ? response.data : [response.data]
//       )
//     } else {
//       setIncomeDataYearly([])
//     }
//     console.log('🚀 ~ getIncomeData  ~ response:', response)
//   }

//   //Get getGPData
//   const fetchGPData = async () => {
//     const companyId = 75 // Example companyId
//     const startDate = '2025-02-01' // Example startDate
//     const endDate = '2025-03-31' // Example endDate

//     const response = await getGPData(companyId, startDate, endDate, token)
//     if (response.data) {
//       setGPData(Array.isArray(response.data) ? response.data : [response.data])
//     } else {
//       setGPData([])
//     }
//     console.log('🚀 ~ GetGPData   ~ response:', response.data)
//   }

//   //Get getGPData yearly
//   const fetchGPDataYearly = async () => {
//     const companyId = 75 // Example companyId
//     const startDate = '' // Example startDate
//     const endDate = '' // Example endDate

//     const response = await getGPData(companyId, startDate, endDate, token)
//     if (response.data) {
//       setGPDataYearly(
//         Array.isArray(response.data) ? response.data : [response.data]
//       )
//     } else {
//       setGPDataYearly([])
//     }
//     console.log('🚀 ~ GetGPData   ~ response:', response)
//   }

//   //Get getNPData
//   const fetchNPData = async () => {
//     const companyId = 75 // Example companyId
//     const startDate = '2025-01-01' // Example startDate
//     const endDate = '2025-12-31' // Example endDate

//     const response = await getNPData(companyId, startDate, endDate, token)
//     if (response.data) {
//       setNPData(Array.isArray(response.data) ? response.data : [response.data])
//     } else {
//       setNPData([])
//     }
//     console.log('🚀 ~ GetNPData   ~ response:', response)
//   }

//   //Get getNPData yearly
//   const fetchNPDataYearly = async () => {
//     const companyId = 75 // Example companyId
//     const startDate = '' // Example startDate
//     const endDate = '' // Example endDate

//     const response = await getNPData(companyId, startDate, endDate, token)
//     if (response.data) {
//       setNPDataYearly(
//         Array.isArray(response.data) ? response.data : [response.data]
//       )
//     } else {
//       setNPDataYearly([])
//     }
//     console.log('🚀 ~ GetNPData   ~ response:', response)
//   }

//   //Get Cost Breakdown Data
//   const fetchCostBreakdown = async () => {
//     const departmentId = 16 // Default to 0 if no department is selected
//     const startDate = '2025-01-01' // Example startDate
//     const endDate = '2025-03-31' // Example endDate
//     const companyId = 75 // Example companyId

//     const response = await getCostBreakdown(
//       departmentId,
//       startDate,
//       endDate,
//       companyId
//     )
//     if (response.data) {
//       setCostBreakdown(
//         Array.isArray(response.data) ? response.data : [response.data]
//       )
//     } else {
//       setCostBreakdown([])
//     }
//     console.log('🚀 ~ GetCostBreakdown ~ response:', response)
//   }
//   React.useEffect(() => {
//     fetchFundPosition()
//     fetchRequisitions()
//     fetchAdvances()
//     fetchExpenseData()
//     fetchExpenseDataYearly()
//     fetchIncomeData()
//     fetchIncomeDataYearly()
//     fetchGPData()
//     fetchGPDataYearly()
//     fetchNPData()
//     fetchNPDataYearly()
//     fetchDepartments()
//     fetchCostBreakdown()
//     fetchAllCompany()
//   }, [fetchFundPosition])

//   const processedFundPositionData = React.useMemo(() => {
//     if (!fundPositionData) return []

//     console.log('Processing fund position data:', fundPositionData)

//     const dates = ['03/03/2025', '02/28/2025'] // We know there are two dates

//     return dates.map((date) => {
//       const cashBalance = fundPositionData.cashBalance
//         .filter((item) => item.date === date)
//         .reduce(
//           (sum, item) => sum + (Number.parseFloat(item.balance || '0') || 0),
//           0
//         )

//       const bankBalance = fundPositionData.BankBalance.flat()
//         .filter((item) => item.date === date)
//         .reduce(
//           (sum, item) => sum + (Number.parseFloat(item.balance || '0') || 0),
//           0
//         )

//       console.log(`Date: ${date}, Cash: ${cashBalance}, Bank: ${bankBalance}`)

//       const [month, day, year] = date.split('/')
//       return {
//         date: `${month}/${day}`,
//         cashBalance,
//         bankBalance,
//         netBalance: cashBalance + bankBalance,
//       }
//     })
//   }, [fundPositionData])

//   console.log('Processed fund position data:', processedFundPositionData)

//   // Calculate total netexpense
//   const totalExpense = expenseData?.reduce(
//     (acc, expense) => acc + (expense?.netExpense || 0),
//     0
//   )
//   // calculate total expense yearly
//   const totalExpenseYearly = expenseDataYearly?.reduce(
//     (acc, expense) => acc + (expense?.netExpense || 0),
//     0
//   )

//   // Calculate total lastmonth expense
//   const lastMonthExpense = expenseData?.reduce(
//     (acc, expense) => acc + (expense?.lastMonthNetExpense || 0),
//     0
//   )
//   // calculate total lastmonth expense yearly
//   const lastMonthExpenseYearly = expenseDataYearly?.reduce(
//     (acc, expense) => acc + (expense?.lastMonthNetExpense || 0),
//     0
//   )

//   // Calculate total thismonth expense
//   const expensePercentageChange =
//     lastMonthExpense !== 0 ? (totalExpense - lastMonthExpense) / 100 : 0

//   // Calculate total thismonth expense yearly
//   const expensePercentageChangeYearly =
//     lastMonthExpenseYearly !== 0
//       ? (totalExpenseYearly - lastMonthExpenseYearly) / 100
//       : 0

//   // Calculate total income
//   const totalIncome = incomeData?.reduce(
//     (acc, expense) => acc + (expense?.netExpense || 0),
//     0
//   )
//   // calculate total income yearly
//   const totalIncomeYearly = incomeDataYearly?.reduce(
//     (acc, expense) => acc + (expense?.netExpense || 0),
//     0
//   )

//   // Calculate total lastmonth income

//   const lastMonthIncome = incomeData?.reduce(
//     (acc, expense) => acc + (expense?.lastMonthNetExpense || 0),
//     0
//   )
//   // calculate total lastmonth income yearly
//   const lastMonthIncomeYearly = incomeDataYearly?.reduce(
//     (acc, expense) => acc + (expense?.lastMonthNetExpense || 0),
//     0
//   )

//   // Calculate total thismonth income
//   const incomePercentageChange =
//     lastMonthExpense !== 0 ? (totalIncome - lastMonthIncome) / 100 : 0

//   // Calculate total thismonth income yearly
//   const incomePercentageChangeYearly =
//     lastMonthExpenseYearly !== 0
//       ? (totalIncomeYearly - lastMonthIncomeYearly) / 100
//       : 0

//   // Calculate total GP
//   const totalGP = gpData?.reduce(
//     (acc, expense) => acc + (expense?.netExpense || 0),
//     0
//   )
//   // calculate total GP yearly
//   const totalGPYearly = gpDataYearly?.reduce(
//     (acc, expense) => acc + (expense?.netExpense || 0),
//     0
//   )
//   // Calculate total lastmonth GP
//   const lastMonthGP = gpData?.reduce(
//     (acc, expense) => acc + (expense?.lastMonthNetExpense || 0),
//     0
//   )
//   // calculate total lastmonth GP yearly
//   const lastMonthGPYearly = gpDataYearly?.reduce(
//     (acc, expense) => acc + (expense?.lastMonthNetExpense || 0),
//     0
//   )
//   // Calculate total thismonth GP
//   const gpPercentageChange =
//     lastMonthExpense !== 0 ? (totalGP - lastMonthGP) / 100 : 0
//   // Calculate total thismonth GP yearly
//   const gpPercentageChangeYearly =
//     lastMonthExpenseYearly !== 0 ? (totalGPYearly - lastMonthGPYearly) / 100 : 0

//   // Calculate total NP
//   const totalNP = npData?.reduce(
//     (acc, expense) => acc + (expense?.netExpense || 0),
//     0
//   )
//   // calculate total NP yearly
//   const totalNPYearly = npDataYearly?.reduce(
//     (acc, expense) => acc + (expense?.netExpense || 0),
//     0
//   )
//   // Calculate total
//   const lastMonthNP = npData?.reduce(
//     (acc, expense) => acc + (expense?.lastMonthNetExpense || 0),
//     0
//   )

//   // calculate total lastmonth NP yearly
//   const lastMonthNPYearly = npDataYearly?.reduce(
//     (acc, expense) => acc + (expense?.lastMonthNetExpense || 0),
//     0
//   )

//   // Calculate total thismonth NP
//   const npPercentageChange =
//     lastMonthExpense !== 0 ? (totalNP - lastMonthNP) / 100 : 0
//   // Calculate total thismonth NP yearly
//   const npPercentageChangeYearly =
//     lastMonthExpenseYearly !== 0 ? (totalNPYearly - lastMonthNPYearly) / 100 : 0

//   function handleDepartmentChange(departmentId: number | null): void {
//     setSelectedDepartment(departmentId)
//     // You can add more logic here if needed, such as fetching data based on the selected department
//   }

//   // Function to handle Pie Chart Click
//   interface PieEntry {
//     financialTag: string
//   }

//   const handlePieClick = (entry: PieEntry) => {
//     const financialTag = entry.financialTag
//     if (financialTag === 'Asset') {
//       window.location.href = `dashboard/cost-breakdown-details/${financialTag}`
//     } else if (financialTag === 'Gross Profit') {
//       window.location.href = `dashboard/cost-breakdown-details/${financialTag}`
//     } else {
//       window.location.href = `dashboard/cost-breakdown-details/${financialTag}`
//     }
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <h1 className="text-2xl font-semibold">Dashboard</h1>
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//           <Select defaultValue="nationa">
//             <SelectTrigger className="w-[240px]">
//               <SelectValue placeholder="Select company" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="nationa">Nationa Accessories</SelectItem>
//               <SelectItem value="other">Other Company</SelectItem>
//             </SelectContent>
//           </Select>
//           {/* <CustomCombobox
//             items={getCompany.map((company) => ({
//               id: company.companyId.toString(),
//               name: company.companyName || 'Unnamed Company',
//             }))}
//             value={
//               field.value
//                 ? {
//                     id: field.value.toString(),
//                     name:
//                       getCompany.find(
//                         (company) => company.companyId === field.value
//                       )?.companyName || 'Unnamed Company',
//                   }
//                 : null
//             }
//             onChange={(value: { id: string; name: string } | null) =>
//               field.onChange(value ? Number.parseInt(value.id, 10) : null)
//             }
//             placeholder="Select company"
//           /> */}
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm">
//               31/03/17
//             </Button>
//             <ChevronDown className="h-4 w-4" />
//             <Button variant="outline" size="sm">
//               31/12/20
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-5">
//         <Link href="/approve-advance">
//           <Card className="p-3 text-center">
//             You have {advances.length} pending advance approvals
//           </Card>
//         </Link>
//         <Link href="/approve-invoice">
//           <Card className="p-3 text-center">
//             You have {invoices.length} pending invoice approvals
//           </Card>
//         </Link>
//       </div>

//       <div className="grid grid-cols-4 gap-4">
//         <div className="grid grid-cols-4 gap-4 col-span-3 ">
//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <Card className="cursor-pointer w-72">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-base font-serif">
//                     Current Month Revenue
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     ${totalIncome?.toLocaleString()}
//                   </div>
//                   <p
//                     className={`text-xs ${incomePercentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}
//                   >
//                     {incomePercentageChange}% vs prev
//                   </p>
//                 </CardContent>
//               </Card>
//             </HoverCardTrigger>

//             <HoverCardContent className="w-80 bg-slate-300 p-2 rounded-lg shadow-2xl border flex-auto gap-4 z-10">
//               <div>
//                 <table className="w-full table-auto text-sm">
//                   <thead className="bg-slate-400">
//                     <tr>
//                       <th className="text-left p-2 text-sm">Group Name</th>
//                       <th className="text-left p-2 text-sm">This Month</th>
//                       <th className="text-left p-2 text-sm">Last Month</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {incomeData.map((expense, index) => (
//                       <tr key={index} className="bg-slate-300 border-b">
//                         <td className="p-2 text-sm">{expense.groupName}</td>
//                         <td className="p-2 text-sm">{expense.netExpense}</td>
//                         <td className="p-2 text-sm">
//                           {expense.lastMonthNetExpense}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </HoverCardContent>
//           </HoverCard>

//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <Card className="cursor-pointer w-72">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-base font-serif">
//                     Current Month Cost
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     {' '}
//                     ${totalExpense?.toLocaleString()}
//                   </div>
//                   <p
//                     className={`text-xs ${expensePercentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}
//                   >
//                     {expensePercentageChange}% vs prev
//                   </p>
//                 </CardContent>
//               </Card>
//             </HoverCardTrigger>

//             <HoverCardContent className="w-auto bg-slate-300 p-2 rounded-lg shadow-2xl border flex-auto gap-4 z-10">
//               <div>
//                 <table className="w-full table-auto text-sm">
//                   <thead className="bg-slate-400">
//                     <tr>
//                       <th className="text-left p-2 text-sm">Group Name</th>
//                       <th className="text-left p-2 text-sm">This Month</th>
//                       <th className="text-left p-2 text-sm">Last Month</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {expenseData.map((expense, index) => (
//                       <tr key={index} className="bg-slate-300 border-b">
//                         <td className="p-2 text-sm">{expense.groupName}</td>
//                         <td className="p-2 text-sm">{expense.netExpense}</td>
//                         <td className="p-2 text-sm">
//                           {expense.lastMonthNetExpense}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </HoverCardContent>
//           </HoverCard>

//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <Card className="cursor-pointer w-72">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-base font-serif">
//                     Current Month Gross Margin
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     ${totalGP?.toLocaleString()}
//                   </div>
//                   <p
//                     className={`text-xs ${gpPercentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}
//                   >
//                     {gpPercentageChange}% vs prev
//                   </p>
//                 </CardContent>
//               </Card>
//             </HoverCardTrigger>

//             <HoverCardContent className="w-auto bg-slate-300 p-2 rounded-lg shadow-2xl border flex-auto gap-4 z-10">
//               <div>
//                 <table className="w-full table-auto text-sm">
//                   <thead className="bg-slate-400">
//                     <tr>
//                       <th className="text-left p-2 text-sm">Group Name</th>
//                       <th className="text-left p-2 text-sm">This Month</th>
//                       <th className="text-left p-2 text-sm">Last Month</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {gpData.map((expense, index) => (
//                       <tr key={index} className="bg-slate-300 border-b">
//                         <td className="p-2 text-sm">{expense.groupName}</td>
//                         <td className="p-2 text-sm">{expense.netExpense}</td>
//                         <td className="p-2 text-sm">
//                           {expense.lastMonthNetExpense}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </HoverCardContent>
//           </HoverCard>

//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <Card className="cursor-pointer w-72">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-base font-serif">
//                     Current Month Net Margin
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     ${totalNP.toLocaleString()}
//                   </div>
//                   <p
//                     className={`text-xs ${npPercentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}
//                   >
//                     {npPercentageChange}% vs prev
//                   </p>
//                 </CardContent>
//               </Card>
//             </HoverCardTrigger>
//             <HoverCardContent className="w-auto bg-slate-300 p-2 rounded-lg shadow-2xl border flex-auto gap-4 z-10">
//               <div>
//                 <table className="w-full table-auto text-sm">
//                   <thead className="bg-slate-400">
//                     <tr>
//                       <th className="text-left p-2 text-sm">Group Name</th>
//                       <th className="text-left p-2 text-sm">This Month</th>
//                       <th className="text-left p-2 text-sm">Last Month</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {npData.map((expense, index) => (
//                       <tr key={index} className="bg-slate-300 border-b">
//                         <td className="p-2 text-sm">{expense.groupName}</td>
//                         <td className="p-2 text-sm">{expense.netExpense}</td>
//                         <td className="p-2 text-sm">
//                           {expense.lastMonthNetExpense}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </HoverCardContent>
//           </HoverCard>

//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <Card className="cursor-pointer w-72">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-base font-serif">
//                     Current Financial Year Revenue
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">${totalIncomeYearly}</div>
//                   <p
//                     className={`text-xs ${npPercentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}
//                   >
//                     {incomePercentageChangeYearly}% vs prev
//                   </p>
//                 </CardContent>
//               </Card>
//             </HoverCardTrigger>
//             <HoverCardContent className="w-auto bg-slate-300 p-2 rounded-lg shadow-2xl border flex-auto gap-4 z-10">
//               <div>
//                 <table className="w-full table-auto text-sm">
//                   <thead className="bg-slate-400">
//                     <tr>
//                       <th className="text-left p-2 text-sm">Group Name</th>
//                       <th className="text-left p-2 text-sm">This Month</th>
//                       <th className="text-left p-2 text-sm">Last Month</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {incomeDataYearly.map((expense, index) => (
//                       <tr key={index} className="bg-slate-300 border-b">
//                         <td className="p-2 text-sm">{expense.groupName}</td>
//                         <td className="p-2 text-sm">{expense.netExpense}</td>
//                         <td className="p-2 text-sm">
//                           {expense.lastMonthNetExpense}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </HoverCardContent>
//           </HoverCard>

//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <Card className="cursor-pointer w-72">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-base font-serif">
//                     Current Financial Year Cost
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     ${totalExpenseYearly.toLocaleString()}
//                   </div>
//                   <p
//                     className={`text-xs ${expensePercentageChangeYearly >= 0 ? 'text-green-500' : 'text-red-500'}`}
//                   >
//                     {expensePercentageChangeYearly}% vs prev
//                   </p>
//                 </CardContent>
//               </Card>
//             </HoverCardTrigger>
//             <HoverCardContent className="w-auto bg-slate-300 p-2 rounded-lg shadow-2xl border flex-auto gap-4 z-10">
//               <div>
//                 <table className="w-full table-auto text-sm">
//                   <thead className="bg-slate-400">
//                     <tr>
//                       <th className="text-left p-2 text-sm">Group Name</th>
//                       <th className="text-left p-2 text-sm">This Month</th>
//                       <th className="text-left p-2 text-sm">Last Month</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {expenseDataYearly.map((expense, index) => (
//                       <tr key={index} className="bg-slate-300 border-b">
//                         <td className="p-2 text-sm">{expense.groupName}</td>
//                         <td className="p-2 text-sm">{expense.netExpense}</td>
//                         <td className="p-2 text-sm">
//                           {expense.lastMonthNetExpense}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </HoverCardContent>
//           </HoverCard>

//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <Card className="cursor-pointer w-72">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-base font-serif">
//                     Current Financial Year Gross Margin
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     ${totalGPYearly.toLocaleString()}
//                   </div>
//                   <p
//                     className={`text-xs ${expensePercentageChangeYearly >= 0 ? 'text-green-500' : 'text-red-500'}`}
//                   >
//                     {gpPercentageChangeYearly}% vs prev
//                   </p>
//                 </CardContent>
//               </Card>
//             </HoverCardTrigger>
//             <HoverCardContent className="w-auto bg-slate-300 p-2 rounded-lg shadow-2xl border flex-auto gap-4 z-10">
//               <div>
//                 <table className="w-full table-auto text-sm">
//                   <thead className="bg-slate-400">
//                     <tr>
//                       <th className="text-left p-2 text-sm">Group Name</th>
//                       <th className="text-left p-2 text-sm">This Month</th>
//                       <th className="text-left p-2 text-sm">Last Month</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {gpDataYearly.map((expense, index) => (
//                       <tr key={index} className="bg-slate-300 border-b">
//                         <td className="p-2 text-sm">{expense.groupName}</td>
//                         <td className="p-2 text-sm">{expense.netExpense}</td>
//                         <td className="p-2 text-sm">
//                           {expense.lastMonthNetExpense}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </HoverCardContent>
//           </HoverCard>

//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <Card className="cursor-pointer w-72">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-base font-serif">
//                     Current Financial Year Net Margin
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     ${totalNPYearly.toLocaleString()}
//                   </div>
//                   <p
//                     className={`text-xs ${expensePercentageChangeYearly >= 0 ? 'text-green-500' : 'text-red-500'}`}
//                   >
//                     {npPercentageChangeYearly}% vs prev
//                   </p>
//                 </CardContent>
//               </Card>
//             </HoverCardTrigger>
//             <HoverCardContent className="w-auto bg-slate-300 p-2 rounded-lg shadow-2xl border flex-auto gap-4 z-10">
//               <div>
//                 <table className="w-full table-auto text-sm">
//                   <thead className="bg-slate-400">
//                     <tr>
//                       <th className="text-left p-2 text-sm">Group Name</th>
//                       <th className="text-left p-2 text-sm">This Month</th>
//                       <th className="text-left p-2 text-sm">Last Month</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {npDataYearly.map((expense, index) => (
//                       <tr key={index} className="bg-slate-300 border-b">
//                         <td className="p-2 text-sm">{expense.groupName}</td>
//                         <td className="p-2 text-sm">{expense.netExpense}</td>
//                         <td className="p-2 text-sm">
//                           {expense.lastMonthNetExpense}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </HoverCardContent>
//           </HoverCard>
//         </div>

//         <Card className="lg:col-span-1">
//           <CardHeader>
//             <div className="flex items-center justify-between gap-1">
//               <CardTitle className="text-sm">Cost Breakdown</CardTitle>
//               <CustomCombobox
//                 items={department.map((dept) => ({
//                   id: dept.departmentID.toString(),
//                   name: dept.departmentName || 'Unnamed Department',
//                 }))}
//                 value={
//                   selectedDepartment
//                     ? {
//                         id: selectedDepartment.toString(),
//                         name:
//                           department.find(
//                             (d) => d.departmentID === selectedDepartment
//                           )?.departmentName || '',
//                       }
//                     : null
//                 }
//                 onChange={(value) =>
//                   handleDepartmentChange(
//                     value ? Number.parseInt(value.id, 10) : null
//                   )
//                 }
//                 placeholder="Select department"
//               />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 value: { label: 'Cost', color: 'hsl(252, 100%, 70%)' },
//               }}
//             >
//               {costBreakdown && costBreakdown.length > 0 ? (
//                 <PieChart width={300} height={300}>
//                   <Pie
//                     data={costBreakdown.map((item) => ({
//                       ...item,
//                       balance: Math.abs(parseFloat(item.balance.toString())),
//                     }))}
//                     dataKey="balance"
//                     nameKey="financialTag"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     fill="hsl(252, 100%, 70%)"
//                     label
//                     onClick={handlePieClick} // Click event to navigate
//                     cursor="pointer"
//                   >
//                     {costBreakdown.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={`hsl(${index * 60}, 100%, 70%)`}
//                         style={{ cursor: 'pointer' }}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               ) : (
//                 <div className="flex h-[300px] items-center justify-center">
//                   No data available
//                 </div>
//               )}
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <Card className="">
//           <CardHeader>
//             <CardTitle>Fund Position</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 cashBalance: {
//                   label: 'Cash Balance',
//                   color: 'hsl(252, 100%, 70%)',
//                 },
//                 bankBalance: {
//                   label: 'Bank Balance',
//                   color: 'hsl(180, 100%, 70%)',
//                 },
//                 netBalance: {
//                   label: 'Net Balance',
//                   color: 'hsl(0, 100%, 70%)',
//                 },
//               }}
//             >
//               <LineChart
//                 data={processedFundPositionData}
//                 margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//                 width={600}
//                 height={300}
//               >
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip content={<ChartTooltipContent />} />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="cashBalance"
//                   stroke="hsl(252, 100%, 70%)"
//                   strokeWidth={2}
//                   dot={{
//                     stroke: 'hsl(252, 100%, 70%)',
//                     fill: 'white',
//                     strokeWidth: 2,
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="bankBalance"
//                   stroke="hsl(180, 100%, 70%)"
//                   strokeWidth={2}
//                   dot={{
//                     stroke: 'hsl(180, 100%, 70%)',
//                     fill: 'white',
//                     strokeWidth: 2,
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="netBalance"
//                   stroke="hsl(0, 100%, 70%)"
//                   strokeWidth={2}
//                   dot={{
//                     stroke: 'hsl(0, 100%, 70%)',
//                     fill: 'white',
//                     strokeWidth: 2,
//                   }}
//                 />
//               </LineChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         <Card className="">
//           <CardHeader>
//             <CardTitle>Inventory Turnover</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 rawMaterials: {
//                   label: 'Raw Materials',
//                   color: 'hsl(252, 100%, 70%)',
//                 },
//                 color: {
//                   label: 'Color',
//                   color: 'hsl(180, 100%, 70%)',
//                 },
//                 packaging: {
//                   label: 'Packaging',
//                   color: 'hsl(0, 100%, 70%)',
//                 },
//               }}
//             >
//               <AreaChart
//                 data={inventoryData}
//                 margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//                 width={900}
//                 height={300}
//               >
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <Area
//                   type="monotone"
//                   dataKey="rawMaterials"
//                   stackId="1"
//                   stroke="hsl(252, 100%, 70%)"
//                   fill="hsl(252, 100%, 70%)"
//                   fillOpacity={0.2}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="color"
//                   stackId="1"
//                   stroke="hsl(180, 100%, 70%)"
//                   fill="hsl(180, 100%, 70%)"
//                   fillOpacity={0.2}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="packaging"
//                   stackId="1"
//                   stroke="hsl(0, 100%, 70%)"
//                   fill="hsl(0, 100%, 70%)"
//                   fillOpacity={0.2}
//                 />
//               </AreaChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
import React from 'react'

const dashboard = () => {
  return (
   <div className="flex items-center justify-center gap-4">
  <img
    src="ispahani-.jpg"
    alt="Ispahani Logo"
    className="w-auto h-14 rounded-full"
  />
  <h1 className="uppercase text-4xl font-bold bg-gradient-to-r from-green-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent p-2 text-center animate-pulse shadow-lg">
    tea is our life
  </h1>
    </div>
  )
}

export default dashboard


