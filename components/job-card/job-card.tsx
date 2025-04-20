'use client'
import React, { useState } from 'react'
import JobCardList from './job-card-list'
import JobCardPopUp from './job-card-popup'

const JobCard = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddVehicle = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
          <JobCardList onAddVehicle={handleAddVehicle} />
            <JobCardPopUp isOpen={isOpen} onClose={handleClose} />
    </div>
  )
}

export default JobCard
