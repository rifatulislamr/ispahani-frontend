'use client'
import type React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface VehicleInformationPopUPProps {
  isOpen: boolean
  onClose: () => void
}

const VehicleInformationPopUP: React.FC<VehicleInformationPopUPProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white border border-gray-300 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#40BFC1] p-2 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-[#800000] text-3xl font-bold underline">
            Vehicle Information
          </h2>
          <button
            onClick={onClose}
            className="text-[#800000] text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Main Form */}
        <div className="bg-gray-400 p-2">
          <div className="grid grid-cols-4 gap-x-1 gap-y-1 text-xs">
            {/* Rest of the form content remains the same */}
            {/* Row 1 */}
            <FormField label="Brand" defaultValue="Suzuki" />
            <FormField label="Model" defaultValue="Ravi" />
            <FormField label="MF Year" defaultValue="2001" />
            <FormField
              label="Mileage(Used)"
              defaultValue=""
              rightElement={
                <Select defaultValue="kilometer">
                  <SelectTrigger className="h-6 text-xs">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kilometer">Kilometer</SelectItem>
                    <SelectItem value="mile">Mile</SelectItem>
                  </SelectContent>
                </Select>
              }
            />

            {/* Row 2 */}
            <FormField label="Color" defaultValue="Pearl" />
            <FormField label="Shape" defaultValue="Van" />
            <FormField label="Engine Capacity(CC)" defaultValue="800" />
            <FormField label="Color" defaultValue="Multi" />

            {/* Row 3 */}
            <FormField label="Engine No" defaultValue="T-123783" />
            <FormField label="Chassis No" defaultValue="233437" />
            <FormField
              label="Gear Type"
              defaultValue=""
              rightElement={
                <Select defaultValue="manual">
                  <SelectTrigger className="h-6 text-xs">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
            <FormField label="Made By" defaultValue="Pakistan" />

            {/* Row 4 */}
            <FormField label="Vehicle Type" defaultValue="Covered Van" />
            <FormField label="Tire Size" defaultValue="4.50.12" />
            <FormField label="Battery Size" defaultValue="NS60L" />
            <FormField
              label="Fuel Type"
              defaultValue=""
              rightElement={
                <Select defaultValue="petrol">
                  <SelectTrigger className="h-6 text-xs">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                  </SelectContent>
                </Select>
              }
            />

            {/* Row 5 */}
            <FormField
              label="Registration No"
              defaultValue="Dhaka Metro HA 21-2071"
            />
            <FormField label="Reg. Date" defaultValue="17/10/2001" />
            <FormField label="Reg.Renewal date" defaultValue="" />
            <div className="flex flex-col">
              <div className="text-center bg-gray-300 font-bold">
                (Use F3 to select Name)
              </div>
            </div>

            {/* Row 6 */}
            <FormField
              label="Status"
              defaultValue=""
              rightElement={
                <Select defaultValue="sold">
                  <SelectTrigger className="h-6 text-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
            <FormField label="Owner" defaultValue="Company" />
            <FormField label="Belongs To" defaultValue="MML, Tea Marketing" />
            <FormField label="User's Tel" defaultValue="01973090475" />

            {/* Row 7 */}
            <FormField label="Present User" defaultValue="Mr. Sultan Rashid" />
            <FormField label="Using Date" defaultValue="" />
            <FormField label="Designation" defaultValue="" />
            <FormField
              label="Driver Provide By"
              defaultValue=""
              rightElement={
                <Select defaultValue="company">
                  <SelectTrigger className="h-6 text-xs">
                    <SelectValue placeholder="Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              }
            />

            {/* Row 8 */}
            <FormField
              label="Present Driver"
              defaultValue="Mr. Monir Hossain"
            />
            <div className="flex flex-col">
              <div className="text-blue-900 font-bold">D.Date</div>
              <Input className="h-6 text-xs bg-white" defaultValue="" />
              <div className="text-center bg-gray-300 font-bold">
                (Use F3 to select Name)
              </div>
            </div>
            <FormField label="Driver Tel" defaultValue="01917046147" />
            <div className="flex flex-col">
              <div className="text-blue-900 font-bold">Location</div>
              <Input className="h-6 text-xs bg-white" defaultValue="Khulna" />
              <div className="text-center bg-gray-300 font-bold">
                Use F3 to select Name
              </div>
            </div>

            {/* Row 9 */}
            <FormField
              label="Maintained By"
              defaultValue="Ispahani Tea Limited"
            />
            <FormField
              label="Insurance No"
              defaultValue="CICL/AGB/M/V/P/CE/..."
            />
            <FormField label="Insurance Premium" defaultValue="8,358.00" />
            <FormField label="Insurance Type" defaultValue="Motor" />

            {/* Row 10 */}
            <FormField label="Insurance Comp" defaultValue="Crystal" />
            <FormField label="Purchase Date" defaultValue="" />
            <FormField
              label="Purchase By"
              defaultValue=""
              rightElement={
                <Select defaultValue="lease">
                  <SelectTrigger className="h-6 text-xs">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lease">Lease</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
            <FormField label="Installment" defaultValue="" />

            {/* Row 11 */}
            <FormField label="Purchase Amt" defaultValue="4,25,000.00" />
            <FormField label="Supplier Address" defaultValue="" />
            <FormField label="Div/Depot" defaultValue="KHULNA" />
            <FormField label="KHLC_Sonadanga" defaultValue="" />

            {/* Row 12 */}
            <FormField label="Supplier" defaultValue="Uttara Motors Ltd." />
            <FormField label="Lease/Agreement Date" defaultValue="" />
            <div className="col-span-2 flex flex-col">
              <div className="text-center bg-gray-300 font-bold">
                User Information
              </div>
            </div>

            {/* Row 13 */}
            <FormField
              label="Leasing Comp"
              defaultValue="IDLC of Bangladesh Ltd."
            />
            <FormField
              label="Viewed By"
              defaultValue=""
              rightElement={
                <Select defaultValue="dhaka">
                  <SelectTrigger className="h-6 text-xs">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="khulna">Khulna</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
            <div className="col-span-2">
              <Table className="border border-gray-500 text-xs">
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-6 p-1 text-center font-bold">
                      User
                    </TableHead>
                    <TableHead className="h-6 p-1 text-center font-bold">
                      From Dt
                    </TableHead>
                    <TableHead className="h-6 p-1 text-center font-bold">
                      To Dt
                    </TableHead>
                    <TableHead className="h-6 p-1 text-center font-bold">
                      Remarks
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="h-6 p-1"></TableCell>
                    <TableCell className="h-6 p-1"></TableCell>
                    <TableCell className="h-6 p-1"></TableCell>
                    <TableCell className="h-6 p-1"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Row 14 */}
            <FormField label="Paid Amt" defaultValue="" />
            <FormField label="Rest Amt" defaultValue="4,26,000" />
            <div className="col-span-2"></div>

            {/* Row 15 */}
            <FormField
              label="Last Insurance Pay Date"
              defaultValue="08/01/2013"
            />
            <FormField
              label="Next Insurance Pay Date"
              defaultValue="07/01/2014"
            />
            <div className="col-span-2"></div>

            {/* Row 16 */}
            <FormField
              label="Last Tax Token Pay Date"
              defaultValue="13/10/2012"
            />
            <FormField
              label="Next Tax/Token Pay Date"
              defaultValue="13/10/2013"
            />
            <div className="col-span-2"></div>

            {/* Row 17 */}
            <FormField
              label="Last Fitness Pay Date"
              defaultValue="25/12/2012"
            />
            <FormField
              label="Last Fitness Pay Date"
              defaultValue="25/12/2013"
            />
            <div className="col-span-2"></div>

            {/* Row 18 */}
            <FormField
              label="Last Route Permit Pay Date"
              defaultValue="17/10/2010"
            />
            <FormField
              label="Next Road Permit Pay Date"
              defaultValue="17/10/2013"
            />
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FormFieldProps {
  label: string
  defaultValue?: string
  rightElement?: React.ReactNode
}

function FormField({ label, defaultValue = '', rightElement }: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <div className="text-blue-900 font-bold">{label}</div>
      <div className="flex">
        <Input
          className="h-6 text-xs bg-white flex-grow"
          defaultValue={defaultValue}
        />
        {rightElement}
      </div>
    </div>
  )
}

export default VehicleInformationPopUP
