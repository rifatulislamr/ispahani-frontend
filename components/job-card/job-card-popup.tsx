'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { UserIcon } from 'lucide-react'

interface JobCardPopUPProps {
  isOpen: boolean
  onClose: () => void
}

const JobCardPopUp: React.FC<JobCardPopUPProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const [formData, setFormData] = useState({
    jobDate: '19/03/2025',
    user: 'Local Delivery Purpose',
    regNo: 'Chatta Metro   MA      61-0128',
    engineNo: '',
    mntBy: 'IML',
    driver: 'Mr. Siraj Meah',
    presentKM: '5764',
    workshopLoc: 'workshop',
    remarks: '',
    jobNo: '25/00269',
    tel1: '01720174929',
    model: 'Toyota,Townace,2004',
    chassisNo: '',
    location: 'IML Factory Ctg',
    tel2: '01914890605',
    jobNature: 'accident',
    workshop: 'VMD WKSP Ctg (M/C: Ispahani Tea Limited)',
  })

  const handleSubmit = () => {
    console.log(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white border border-gray-300 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
        <div className="p-2 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <UserIcon className="text-amber-600" />
            Job Card Information
          </h2>
          <button onClick={onClose} className="text-3xl font-bold">
            ×
          </button>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="jobDate"
                  className="text-primary font-medium text-right"
                >
                  Job Date:
                </Label>
                <Input
                  id="jobDate"
                  value={formData.jobDate}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, jobDate: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="user"
                  className="text-primary font-medium text-right"
                >
                  User:
                </Label>
                <Input
                  id="user"
                  value={formData.user}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, user: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="regNo"
                  className="text-primary font-medium text-right"
                >
                  Reg No:
                </Label>
                <Input
                  id="regNo"
                  value={formData.regNo}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, regNo: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="engineNo"
                  className="text-primary font-medium text-right"
                >
                  Engine No:
                </Label>
                <Input
                  id="engineNo"
                  value={formData.engineNo}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, engineNo: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="mntBy"
                  className="text-primary font-medium text-right"
                >
                  Mnt By:
                </Label>
                <Input
                  id="mntBy"
                  value={formData.mntBy}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, mntBy: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="driver"
                  className="text-primary font-medium text-right"
                >
                  Driver:
                </Label>
                <Input
                  id="driver"
                  value={formData.driver}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, driver: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="presentKM"
                  className="text-primary font-medium text-right"
                >
                  Present KM:
                </Label>
                <Input
                  id="presentKM"
                  value={formData.presentKM}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, presentKM: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="workshopLoc"
                  className="text-primary font-medium text-right"
                >
                  Workshop Loc:
                </Label>
                <Select
                  value={formData.workshopLoc}
                  onValueChange={(value) =>
                    setFormData({ ...formData, workshopLoc: value })
                  }
                >
                  <SelectTrigger id="workshopLoc" className="col-span-2">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop(Ctg)</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="remarks"
                  className="text-primary font-medium text-right"
                >
                  Remarks:
                </Label>
                <Input
                  id="remarks"
                  value={formData.remarks}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="jobNo"
                  className="text-primary font-medium text-right"
                >
                  Job No:
                </Label>
                <Input
                  id="jobNo"
                  value={formData.jobNo}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, jobNo: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="tel1"
                  className="text-primary font-medium text-right"
                >
                  Tel #:
                </Label>
                <Input
                  id="tel1"
                  value={formData.tel1}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, tel1: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="model"
                  className="text-primary font-medium text-right"
                >
                  Model:
                </Label>
                <Input
                  id="model"
                  value={formData.model}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="chassisNo"
                  className="text-primary font-medium text-right"
                >
                  Chassis No:
                </Label>
                <Input
                  id="chassisNo"
                  value={formData.chassisNo}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, chassisNo: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="location"
                  className="text-primary font-medium text-right"
                >
                  Location:
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="tel2"
                  className="text-primary font-medium text-right"
                >
                  Tel #:
                </Label>
                <Input
                  id="tel2"
                  value={formData.tel2}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, tel2: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="jobNature"
                  className="text-primary font-medium text-right"
                >
                  Job Nature:
                </Label>
                <Select
                  value={formData.jobNature}
                  onValueChange={(value) =>
                    setFormData({ ...formData, jobNature: value })
                  }
                >
                  <SelectTrigger id="jobNature" className="col-span-2">
                    <SelectValue placeholder="Select nature" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accident">Accident</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="repair">Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label
                  htmlFor="workshop"
                  className="text-primary font-medium text-right"
                >
                  Workshop:
                </Label>
                <Input
                  id="workshop"
                  value={formData.workshop}
                  className="col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, workshop: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={handleSubmit} variant="default">
              Submit
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  )
}

export default JobCardPopUp
