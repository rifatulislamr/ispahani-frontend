'use client'

import React, { useState } from 'react'
import IssueNoteList from './issue-note-list'
import IssueNotePopUp from './issue-note-popup'

const IssueNote = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddVehicle = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
      <IssueNotePopUp isOpen={isOpen} onClose={handleClose} />
      <IssueNoteList onAddVehicle={handleAddVehicle} />
    </div>
  )
}

export default IssueNote
