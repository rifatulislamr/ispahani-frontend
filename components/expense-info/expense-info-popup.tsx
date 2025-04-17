'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
interface VehicleInformationPopUPProps {
  isOpen: boolean
  onClose: () => void
}

const ExpenseInfoPopUp: React.FC<VehicleInformationPopUPProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null
    const [formData, setFormData] = useState({
      entryDate: '17/03/2025',
      user: '',
      regNo: 'Gazpur MA 51-0006',
      party: 'BRTA',
      totalAmt: '21,212.00',
      vatAmt: '',
      driverOthers: 'Md. Arif Hossain',
      model: '',
      billNo: '431476',
      billDate: '11/03/2025',
      disLessAmt: '',
      totalPayAmt: '21,212.00',
      remarks: '',
      paymentMode: 'Cash',
    })
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white border border-gray-300 max-h-[90vh] overflow-y-auto">
        <div className="bg-[#40BFC1] p-2 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-[#800000] text-3xl font-bold ">
           Expense Information 
          </h2>
          <button onClick={onClose} className="text-[#800000] text-2xl font-bold">
            ×
          </button>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="entryDate"
                  className="text-right font-bold text-blue-800"
                >
                  Entry Date
                </Label>
                <Input
                  id="entryDate"
                  value={formData.entryDate}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, entryDate: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="user"
                  className="text-right font-bold text-blue-800"
                >
                  User
                </Label>
                <Input
                  id="user"
                  value={formData.user}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, user: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="regNo"
                  className="text-right font-bold text-blue-800"
                >
                  Reg No
                </Label>
                <Input
                  id="regNo"
                  value={formData.regNo}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, regNo: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="party"
                  className="text-right font-bold text-blue-800"
                >
                  Party
                </Label>
                <Input
                  id="party"
                  value={formData.party}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, party: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="totalAmt"
                  className="text-right font-bold text-blue-800"
                >
                  Total Amt
                </Label>
                <Input
                  id="totalAmt"
                  value={formData.totalAmt}
                  className="h-8 text-red-600 font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, totalAmt: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="vatAmt"
                  className="text-right font-bold text-blue-800"
                >
                  Vat Amt
                </Label>
                <Input
                  id="vatAmt"
                  value={formData.vatAmt}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, vatAmt: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="remarks"
                  className="text-right font-bold text-blue-800"
                >
                  Remarks
                </Label>
                <Input
                  id="remarks"
                  value={formData.remarks}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="paymentMode"
                  className="text-right font-bold text-blue-800"
                >
                  Payment Mode
                </Label>
                <Select
                  defaultValue={formData.paymentMode}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentMode: value })
                  }
                >
                  <SelectTrigger id="paymentMode" className="h-8">
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="driverOthers"
                  className="text-right font-bold text-blue-800"
                >
                  Driver/Others
                </Label>
                <Input
                  id="driverOthers"
                  value={formData.driverOthers}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, driverOthers: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="model"
                  className="text-right font-bold text-blue-800"
                >
                  Model
                </Label>
                <Input
                  id="model"
                  value={formData.model}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="billNo"
                  className="text-right font-bold text-blue-800"
                >
                  Bill No
                </Label>
                <Input
                  id="billNo"
                  value={formData.billNo}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, billNo: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="billDate"
                  className="text-right font-bold text-blue-800"
                >
                  Bill Date
                </Label>
                <Input
                  id="billDate"
                  value={formData.billDate}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, billDate: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="disLessAmt"
                  className="text-right font-bold text-blue-800"
                >
                  Dis/Less Amt
                </Label>
                <Input
                  id="disLessAmt"
                  value={formData.disLessAmt}
                  className="h-8"
                  onChange={(e) =>
                    setFormData({ ...formData, disLessAmt: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label
                  htmlFor="totalPayAmt"
                  className="text-right font-bold text-blue-800"
                >
                  Total Pay Amt
                </Label>
                <Input
                  id="totalPayAmt"
                  value={formData.totalPayAmt}
                  className="h-8 font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, totalPayAmt: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  )
}

export default ExpenseInfoPopUp
