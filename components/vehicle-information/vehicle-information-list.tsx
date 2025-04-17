'use client'
import React from 'react'
import { Button } from '../ui/button'

interface VehicleInformationListProps {
 
    onAddVehicle: () => void
}

const VehicleInformationList: React.FC<VehicleInformationListProps> = ({ onAddVehicle }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4 mx-4 mt-10">
        <h1 className="text-2xl font-bold">Vehicle Information List</h1>
        <Button onClick={onAddVehicle}>ADD</Button>
      </div>
    </div>
    )
    }


export default VehicleInformationList
