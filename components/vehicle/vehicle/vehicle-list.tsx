'use client'

import type React from 'react'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ArrowUpDown, Edit, Check, X } from 'lucide-react'
import {
  CostCenter,
  Employee,
  GetAllVehicleType,
  GetAssetData,
} from '@/utils/type'
import { updateVehicleEmployee } from '@/api/vehicle.api'

interface VehicleListProps {
  AllVehicles: GetAllVehicleType[]
  onAddVehicle: () => void
  costCenters: CostCenter[]
  asset: GetAssetData[]
  employeeData: Employee[]
  refreshVehicles: () => void
}

type SortDirection = 'asc' | 'desc'
type SortColumn =
  | 'vehicleNo'
  | 'costCenterName'
  | 'description'
  | 'purchaseDate'
  | 'assetId'
  | 'employeeId'
  | 'employeeName'

export const VehicleList: React.FC<VehicleListProps> = ({
  AllVehicles,
  onAddVehicle,
  asset,
  employeeData,
  refreshVehicles,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>('vehicleNo')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [editingVehicle, setEditingVehicle] = useState<number | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)
  const itemsPerPage = 10

  const getAssetName = (id: number) =>
    asset.find((data) => Number(data.id) === id)?.name || 'Unknown'

  const sortedVehicles = useMemo(() => {
    const sorted = [...AllVehicles]
    sorted.sort((a, b) => {
      if (sortColumn === 'purchaseDate') {
        return sortDirection === 'asc'
          ? new Date(a[sortColumn]).getTime() -
              new Date(b[sortColumn]).getTime()
          : new Date(b[sortColumn]).getTime() -
              new Date(a[sortColumn]).getTime()
      }
      return sortDirection === 'asc'
        ? String(a[sortColumn]).localeCompare(String(b[sortColumn]))
        : String(b[sortColumn]).localeCompare(String(a[sortColumn]))
    })
    return sorted
  }, [AllVehicles, sortColumn, sortDirection])

  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedVehicles.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedVehicles, currentPage])

  const totalPages = Math.ceil(AllVehicles.length / itemsPerPage)

  const handleSort = (column: SortColumn) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const SortableTableHead: React.FC<{
    column: SortColumn
    children: React.ReactNode
  }> = ({ column, children }) => {
    return (
      <TableHead
        onClick={() => handleSort(column)}
        className="cursor-pointer hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-1">
          <span>{children}</span>
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </TableHead>
    )
  }

  function onEditEmployee(vehicleId: number): void {
    setEditingVehicle(vehicleId)
    const vehicle = AllVehicles.find((v) => v.vehicleNo === vehicleId)
    setSelectedEmployee(vehicle?.employeeId || null)
  }

  async function handleSaveEmployee(
    vehicleId: number,
    vehicleUser: number | null
  ) {
    if (vehicleUser === null) return
    try {
      await updateVehicleEmployee(vehicleId, vehicleUser)
      setEditingVehicle(null)
      setSelectedEmployee(null)
      refreshVehicles()
    } catch (error) {
      console.error('Failed to update vehicle employee:', error)
    }
  }

  function handleCancelEdit() {
    setEditingVehicle(null)
    setSelectedEmployee(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mx-4 mt-2">
        <h1 className="text-2xl font-bold">Vehicle List</h1>
        <Button onClick={onAddVehicle}>ADD</Button>
      </div>
      <Table className="border shadow-md">
        <TableHeader className="sticky top-28 bg-slate-200">
          <TableRow>
            <SortableTableHead column="vehicleNo">Vehicle No</SortableTableHead>
            <SortableTableHead column="costCenterName">
              Cost Center
            </SortableTableHead>
            <SortableTableHead column="description">
              Vehicle Description
            </SortableTableHead>
            <SortableTableHead column="purchaseDate">
              Purchase Date
            </SortableTableHead>
            <SortableTableHead column="assetId">Asset Name</SortableTableHead>
            <SortableTableHead column="employeeName">
              Employee Name
            </SortableTableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedVehicles.map((vehicle) => (
            <TableRow key={vehicle.vehicleNo}>
              <TableCell>{vehicle.vehicleNo}</TableCell>
              <TableCell>{vehicle.costCenterName}</TableCell>
              <TableCell>{vehicle.description}</TableCell>
              <TableCell>
                {new Date(vehicle.purchaseDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{getAssetName(vehicle.assetId)}</TableCell>
              <TableCell>
                {editingVehicle === vehicle.vehicleNo ? (
                  <select
                    value={selectedEmployee ?? ''}
                    onChange={(e) =>
                      setSelectedEmployee(Number(e.target.value))
                    }
                    className="border rounded p-1"
                  >
                    {employeeData.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.employeeName}
                      </option>
                    ))}
                  </select>
                ) : (
                  vehicle.employeeName
                )}
              </TableCell>
              <TableCell>
                {editingVehicle === vehicle.vehicleNo ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleSaveEmployee(vehicle.vehicleNo, selectedEmployee)
                      }
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditEmployee(vehicle.vehicleNo)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Change User
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
