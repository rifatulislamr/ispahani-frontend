'use client'
import { UserIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

interface BiddingDataEntryListProps {
  onAddVehicle: () => void
}
const BiddingDataEntryList: React.FC<BiddingDataEntryListProps> = ({
  onAddVehicle,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center  mb-4 mx-7 mt-10">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UserIcon className="text-amber-600" /> Bidding Data Entry List
        </h1>
        <Button
          className="bg-yellow-400 hover:bg-yellow-500 text-black"
          onClick={onAddVehicle}
        >
          ADD
        </Button>
      </div>
    </div>
  )
}

export default BiddingDataEntryList
