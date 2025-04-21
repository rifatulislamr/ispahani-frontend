'use client'
import { UserIcon } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
interface IssueNotePopUpProps {
  isOpen: boolean
  onClose: () => void
}


const IssueNotePopUp: React.FC<IssueNotePopUpProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null


    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4 mt-10">
        <div className="flex flex-col w-full max-w-4xl bg-white max-h-[90vh] overflow-y-auto rounded-lg shadow-lg mx-auto">
          <div className="p-2 flex justify-between items-center sticky top-0 z-10">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <UserIcon className="text-amber-600" />
              Issue Note
            </h2>
            <button onClick={onClose} className="text-3xl font-bold">
              ×
            </button>
          </div>
          <Card className="w-full max-w-3xl mx-auto border-0 ">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issDate" className="font-semibold">
                    Iss Date
                  </Label>
                  <Input id="issDate" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issNo" className="font-semibold">
                    Iss No
                  </Label>
                  <Input id="issNo" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="user" className="font-semibold">
                    User
                  </Label>
                  <Input id="user" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regNo" className="font-semibold">
                    Reg No
                  </Label>
                  <Input id="regNo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver" className="font-semibold">
                    Driver
                  </Label>
                  <Input id="driver" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model" className="font-semibold">
                    Model
                  </Label>
                  <Input id="model" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issBookNo" className="font-semibold">
                    Iss Book No
                  </Label>
                  <Input id="issBookNo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issBookDate" className="font-semibold">
                    Iss Book Date
                  </Label>
                  <Input id="issBookDate" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="remarks" className="font-semibold">
                    Remarks
                  </Label>
                  <Input id="remarks" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
}

export default IssueNotePopUp
