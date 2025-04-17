'use client'
import React, { useState } from 'react'
import ExpenseInfoList from './expense-info-list'
import ExpenseInfoPopUp from './expense-info-popup'

const ExpenseInfo = () => {
     const [isOpen, setIsOpen] = useState(false)
    
      const handleAddVehicle = () => {
        setIsOpen(true)
      }
    
      const handleClose = () => {
        setIsOpen(false)
      }
    return (
      <div>
        <ExpenseInfoList onAddVehicle={handleAddVehicle} />
        <ExpenseInfoPopUp isOpen={isOpen} onClose={handleClose} />
      </div>
    )
}

export default ExpenseInfo
