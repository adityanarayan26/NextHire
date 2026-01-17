'use client'
import React from 'react'
import { UseUser } from '@/app/Provider'

const page = () => {
  const { user } = UseUser()

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">
          Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0] || 'User'}</span> 👋
        </h1>
        <p className="text-[#64748b] mt-1">Manage your AI interviews and track candidate progress</p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <CreateOptions />
        <PreviouslyCreatedInterview />
      </div>
    </div>
  )
}

import CreateOptions from '../_components/CreateOptions'
import PreviouslyCreatedInterview from '../_components/PreviouslyCreatedInterview'

export default page
