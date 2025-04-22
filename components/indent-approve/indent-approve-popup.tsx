'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserIcon } from 'lucide-react'
import { Button } from '../ui/button'
interface IndentApprovePopUpProps {
  isOpen: boolean
  onClose: () => void
}

const IndentApprovePopUp: React.FC<IndentApprovePopUpProps> = ({
  isOpen,
  onClose,
}) => {
    const [approved, setApproved] = useState('yes')
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white max-h-[90vh] overflow-y-auto rounded-lg shadow-lg mx-auto">
        <div className="p-2 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <UserIcon className="text-amber-600" />
            Indent Approve
          </h2>
          <button onClick={onClose} className="text-3xl font-bold">
            ×
          </button>
        </div>
        <Card className=" max-w-3xl  mx-auto border-0">
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="indentDate">Indent Date</Label>
                  <Input id="indentDate" defaultValue="12/11/2020" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="user">User</Label>
                  <Input id="user" defaultValue="Mr. Shorab" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="regNo">Reg No</Label>
                  <div className="flex gap-2">
                    <Input id="regNo1" defaultValue="Barisal" />
                    <Input id="regNo2" defaultValue="MA" />
                    <Input id="regNo3" defaultValue="51-0036" />
                  </div>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Input id="remarks" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <div className="flex gap-2">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="jobNo">Job No</Label>
                      <Input id="jobNo" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="jobDate">Job Date</Label>
                      <Input id="jobDate" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="indentNo">Indent No</Label>
                  <Input id="indentNo" defaultValue="ID2020001" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Barisal" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="driver">Driver</Label>
                  <Input id="driver" defaultValue="Md. Shaidul Merdha" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" defaultValue="Suzuki, Ravi, 2009" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="indentFor">Indent For</Label>
                  <Select defaultValue="vehicle">
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="approve">2st Approve</Label>
                  <RadioGroup
                    value={approved}
                    onValueChange={setApproved}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button type="submit">Submit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default IndentApprovePopUp
