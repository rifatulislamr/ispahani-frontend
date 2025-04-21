'use client'
import React, { useState } from 'react'
import IndentApprovePopUp from './indent-approve-popup'
import IndentApproveList from './indent-approve-list'

const IndentApprove = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddVehicle = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
      <IndentApprovePopUp isOpen={isOpen} onClose={handleClose} />
      <IndentApproveList onAddVehicle={handleAddVehicle} />
    </div>
  )
}

export default IndentApprove
