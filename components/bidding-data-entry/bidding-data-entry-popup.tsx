'use client'
import { UserIcon } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
interface BiddingDateEntryPopUpProps {
  isOpen: boolean
  onClose: () => void
}

const BiddingDateEntryPopUp: React.FC<BiddingDateEntryPopUpProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4 mt-auto">
      <div className="flex flex-col w-full max-w-4xl bg-white max-h-[90vh] overflow-y-auto rounded-lg shadow-lg mx-auto">
        <div className="p-2 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <UserIcon className="text-amber-600" />
            Bidding Date Entry
          </h2>
          <button onClick={onClose} className="text-3xl font-bold">
            ×
          </button>
        </div>
        <Card className="w-full max-w-3xl mx-auto  border-0 rounded-none shadow-none">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {/* Left Column */}
              <div className="flex items-center">
                <Label htmlFor="prodType" className="w-24 font-semibold">
                  Prod Type
                </Label>
                <Select defaultValue="tea">
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tea">TEA</SelectItem>
                    <SelectItem value="coffee">COFFEE</SelectItem>
                    <SelectItem value="other">OTHER</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Right Column */}
              <div className="flex items-center">
                <Label htmlFor="date" className="w-24 font-semibold">
                  Date
                </Label>
                <Input
                  id="date"
                  defaultValue="18/03/2025"
                  className="bg-white"
                />
              </div>

              {/* Left Column */}
              <div className="flex items-center">
                <Label htmlFor="trDay" className="w-24 font-semibold">
                  Tr Day
                </Label>
                <Input id="trDay" defaultValue="Tuesday" className="bg-white" />
              </div>

              {/* Right Column */}
              <div className="flex items-center">
                <Label htmlFor="from" className="w-24 font-semibold">
                  From
                </Label>
                <Input
                  id="from"
                  defaultValue="ITL,Srimongal"
                  className="bg-white"
                />
              </div>

              {/* Left Column */}
              <div className="flex items-center">
                <Label htmlFor="to" className="w-24 font-semibold">
                  To
                </Label>
                <Input
                  id="to"
                  defaultValue="Kushtia Cent Div Office"
                  className="bg-white"
                />
              </div>

              {/* Right Column - Empty for alignment */}
              <div></div>

              {/* Left Column */}
              <div className="flex items-center">
                <Label htmlFor="vNo" className="w-24 font-semibold">
                  V.No
                </Label>
                <Input id="vNo" className="bg-white" />
              </div>

              {/* Right Column */}
              <div className="flex items-center">
                <Label htmlFor="remarks" className="w-24 font-semibold">
                  Remarks
                </Label>
                <Input id="remarks" className="bg-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BiddingDateEntryPopUp
