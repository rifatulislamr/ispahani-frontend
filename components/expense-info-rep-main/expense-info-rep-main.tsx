'use client'
import React, { useState } from 'react'
import ExpenseInfoRepairAndMaintenancePopUp from './expense-info-rep-main-popup'
import ExpenseInfoRepairAndMaintenanceList from './expense-info-rep-main-list'


const ExpenseInfoRepairAndMaintenance = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddVehicle = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
          <ExpenseInfoRepairAndMaintenancePopUp isOpen={isOpen} onClose={handleClose} />
        <ExpenseInfoRepairAndMaintenanceList onAddVehicle={handleAddVehicle} />
    </div>
  )
}

export default ExpenseInfoRepairAndMaintenance