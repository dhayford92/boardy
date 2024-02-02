'use client'

import React from 'react'
import EmptyOrg from './_components/emptyorg'
import { useOrganization } from '@clerk/nextjs'




export default function DashboardPage() {
  const { organization } = useOrganization()

  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
        {!organization ? (
            <EmptyOrg/>
          ): (
            <h1>Dash</h1>
          )
        }
        
    </div>
  )
}
