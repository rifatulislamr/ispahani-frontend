'use client'

import React, { useState } from 'react'
import MaterialReceivedPopUp from './material-received-popup'
import MaterialReceivedList from './material-received-list'

const MaterialReceived = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddVehicle = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
      <MaterialReceivedPopUp isOpen={isOpen} onClose={handleClose} />
      <MaterialReceivedList onAddVehicle={handleAddVehicle} />
    </div>
  )
}

export default MaterialReceived


