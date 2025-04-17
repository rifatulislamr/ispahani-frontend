'use client'
import React, { useState } from 'react'
import VehicleInformationList from './vehicle-information-list'
import VehicleInformationPopUP from './vehicle-information-popup'

const VehicleInformation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddVehicle = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
      <VehicleInformationList onAddVehicle={handleAddVehicle} />
      <VehicleInformationPopUP isOpen={isOpen} onClose={handleClose} />
    </div>
  )
}

export default VehicleInformation
