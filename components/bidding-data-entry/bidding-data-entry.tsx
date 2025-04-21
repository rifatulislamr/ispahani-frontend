'use client'

import React, { useState } from 'react'
import BiddingDataEntryList from './bidding-data-entry-list'
import BiddingDateEntryPopUp from './bidding-data-entry-popup'


const BiddingDataEntry = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddVehicle = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
      <BiddingDateEntryPopUp isOpen={isOpen} onClose={handleClose} />
      <BiddingDataEntryList onAddVehicle={handleAddVehicle} />
    </div>
  )
}

export default BiddingDataEntry
