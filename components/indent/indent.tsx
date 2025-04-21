'use client'
import React, { useState } from 'react'
import IndentPopUp from './indent-popup'
import IndentList from './indent-list'

const Indent = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddVehicle = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
      <IndentPopUp isOpen={isOpen} onClose={handleClose} />
      <IndentList onAddVehicle={handleAddVehicle} />
    </div>
  )
}

export default Indent
