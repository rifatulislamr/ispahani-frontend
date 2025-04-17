'use client'
import React, { JSX } from 'react'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, FileText } from 'lucide-react'
import { Employee, GetAllVehicleType } from '@/utils/type'
import { CustomCombobox } from '@/utils/custom-combobox'

interface VehicleSummaryHeadingProps {
  vehicles: GetAllVehicleType[]
  startDate: Date | undefined
  endDate: Date | undefined
  selectedVehicleNo: number | undefined
  generatePdf: () => void
  generateExcel: () => void
}

const VehicleSummaryHeading: React.FC<VehicleSummaryHeadingProps> = ({
  vehicles,
  startDate,
  endDate,
  selectedVehicleNo,
  generatePdf,
  generateExcel,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [start, setStart] = useState<Date | undefined>(startDate)
  const [end, setEnd] = useState<Date | undefined>(endDate)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('')

  return (
    <div>
      <div className="mt-4">
        <div className="flex flex-col p-4 border-b w-full gap-4">
          <div className="flex items-center justify-center gap-4">
            <Popover
              open={isDropdownOpen}
              onOpenChange={(open) => setIsDropdownOpen(open)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[230px] h-10 justify-start text-left truncate"
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {start && end
                    ? `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`
                    : 'Select Date Range'}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-4" align="start">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Start Date:</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-[180px] h-10 justify-start text-left truncate ${
                            !start ? 'text-muted-foreground' : ''
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          {start
                            ? format(start, 'dd/MM/yyyy')
                            : 'Select Start Date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => {
                            setStart(date)
                            setIsDropdownOpen(false)
                          }}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-medium">End Date:</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-[180px] h-10 justify-start text-left truncate ${
                            !end ? 'text-muted-foreground' : ''
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          {end ? format(end, 'dd/MM/yyyy') : 'Select End Date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => {
                            setEnd(date)
                            setIsDropdownOpen(false)
                          }}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <CustomCombobox
              items={vehicles.map((vehicle) => ({
                id: vehicle.vehicleNo.toString(),
                name: vehicle.description || 'Unnamed Vehicle',
              }))}
              value={
                selectedVehicleId
                  ? {
                      id: selectedVehicleId,
                      name:
                        vehicles.find(
                          (vehicle) =>
                            vehicle.vehicleNo.toString() === selectedVehicleId
                        )?.description || 'Unnamed Vehicle',
                    }
                  : null
              }
              onChange={(value: { id: string; name: string } | null) =>
                setSelectedVehicleId(value ? value.id : '')
              }
              placeholder="Select a Vehicle"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={generatePdf}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-900 hover:bg-purple-200"
            >
              <FileText className="h-4 w-4" />
              <span className="font-medium">PDF</span>
            </Button>
            <Button
              onClick={generateExcel}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-900 hover:bg-green-200"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 2V8H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 13H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 17H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 9H8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium">Excel</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleSummaryHeading
