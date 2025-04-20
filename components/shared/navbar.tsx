'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Company, User } from '@/utils/type'
import { Search, List, Plus } from 'lucide-react'
import { DollarSign, Building, BookOpen, Repeat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const companiesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        companiesRef.current &&
        !companiesRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileRef, companiesRef])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 border-b">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-3xl font-semibold text-yellow-400 uppercase">
              Ispahani Tea Limited
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="hidden sm:flex sm:items-center sm:space-x-4 ml-4">
              <div className="relative flex items-center space-x-4">
                {/* List of Assets */}
                <button className="flex items-center space-x-2 p-3 text-sm font-medium text-gray-900  rounded-lg transition ease-in-out duration-150">
                  <List className="h-5 w-5" />
                  <span>List of Assets</span>
                </button>

                {/* Add an Asset */}
                <button className="flex items-center space-x-2 p-3 text-sm font-medium text-gray-900  rounded-lg transition ease-in-out duration-150">
                  <PlusCircle className="h-5 w-5" />
                  <span>Add an Asset</span>
                </button>

                {/* Search Input and Button */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 text-sm focus:outline-none"
                  />
                  <button className="p-2 bg-yellow-400 hover:bg-yellow-500 transition ease-in-out duration-150">
                    <Search className="h-5 w-5 text-gray-900" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center justify-center w-10 h-10 text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-500 ease-in-out"
                id="user-menu"
                aria-label="User menu"
                aria-haspopup="true"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  width={40}
                  height={40}
                  className="rounded-full border"
                  alt="Profile"
                />
              </button>
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                  <div
                    className="py-1 rounded-md bg-white shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      href="/change-password"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Change Password
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
