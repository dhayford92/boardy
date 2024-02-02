'use client'

import React from 'react'
import EmptyOrg from './_components/emptyorg'
import { useOrganization } from '@clerk/nextjs'
import BordList from './_components/bordlist';


interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorite?: string;
  };
};


export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization()

  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
        {!organization ? (
            <EmptyOrg/>
          ): (
            <BordList
              orgId={organization.id}
              query={searchParams}
            />
          )
        }
        
    </div>
  )
}
