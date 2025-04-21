'use client'
import { UserIcon } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'

interface MaterialReceivedPopUpProps {
  isOpen: boolean
  onClose: () => void
}

const MaterialReceivedPopUp: React.FC<MaterialReceivedPopUpProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white max-h-[90vh] overflow-y-auto rounded-lg shadow-lg mx-auto">
        <div className="p-2 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <UserIcon className="text-amber-600" />
            Material Received
          </h2>
          <button onClick={onClose} className="text-3xl font-bold">
            ×
          </button>
        </div>
        <Card className="w-full max-w-3xl border-0 mx-auto">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <Label htmlFor="mrDate" className="font-medium">
                    MR Date
                  </Label>
                  <Input
                    id="mrDate"
                    defaultValue="23/02/2014"
                    className="h-9"
                  />
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <Label htmlFor="indNo" className="font-medium">
                    Ind No
                  </Label>
                  <Input id="indNo" defaultValue="1/14/0014" className="h-9" />
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <Label htmlFor="user" className="font-medium">
                    User
                  </Label>
                  <Input
                    id="user"
                    defaultValue="Vehicle Workshop"
                    className="h-9"
                  />
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <Label htmlFor="regNo" className="font-medium">
                    Reg No
                  </Label>
                  <Input
                    id="regNo"
                    defaultValue="00        00        0000"
                    className="h-9"
                  />
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <Label htmlFor="remarks" className="font-medium">
                    Remarks
                  </Label>
                  <Input id="remarks" className="h-9" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <Label htmlFor="mrNo" className="font-medium">
                    MR No
                  </Label>
                  <Input id="mrNo" defaultValue="MR14/0020" className="h-9" />
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <Label htmlFor="indDate" className="font-medium">
                    Ind Date
                  </Label>
                  <Input
                    id="indDate"
                    defaultValue="19-FEB-2014"
                    className="h-9"
                  />
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <Label htmlFor="driver" className="font-medium">
                    Driver
                  </Label>
                  <Input id="driver" className="h-9" />
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <Label htmlFor="model" className="font-medium">
                    Model
                  </Label>
                  <Input id="model" className="h-9" />
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <Label htmlFor="location" className="font-medium">
                    Location
                  </Label>
                  <Input
                    id="location"
                    defaultValue="VMD, Workshop, Pahatali"
                    className="h-9"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button>Submit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MaterialReceivedPopUp
