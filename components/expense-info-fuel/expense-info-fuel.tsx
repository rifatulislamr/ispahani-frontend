'use client'
import React, { useState } from 'react'
import ExpenseInfoFuelList from './expense-info-fuel-list'
import ExpenseInfoFuelPopUp from './expense-info-fuel-popup'

const ExpenseInfoFuel = () => {
     const [isOpen, setIsOpen] = useState(false)
    
      const handleAddVehicle = () => {
        setIsOpen(true)
      }
    
      const handleClose = () => {
        setIsOpen(false)
      }
    return (
      <div>
        <ExpenseInfoFuelList onAddVehicle={handleAddVehicle} />
        <ExpenseInfoFuelPopUp isOpen={isOpen} onClose={handleClose} />
      </div>
    )
  
}

export default ExpenseInfoFuel
