'use client'

import Link from 'next/link'
import Image from 'next/image'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, StarIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'


function OrgSidebar() {
  const searchParams = useSearchParams()
  const favorites = searchParams.get('favorites') === 'true'

  return (
    <div className='hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5'>
        <Link href='/'>
          <div className='w-full h-12 relative overflow-hidden'>
            <Image src='/logo.png' fill alt='logo' className='absolute object-cover' />
          </div>
        </Link>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              },
              organizationSwitcherTrigger: {
                padding: '6px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }
            }
          }}
         />

         <div className='spcae-y-1 w-full'>
            <Button 
              variant={favorites ? 'ghost' : 'secondary'} 
              asChild size='lg' className='font-normal justify-start px-2 w-full'>
              <Link href='/'>
                <LayoutDashboard className='w-4 h-4 mr-2' />
                Team boards
              </Link>
            </Button>
            <Button 
              variant={favorites ? 'secondary' : 'ghost'} 
              asChild size='lg' className='font-normal justify-start px-2 w-full'>
              <Link href={{
                pathname: "/",
                query: { favorites: true },
              }}>
                <StarIcon className='w-4 h-4 mr-2' />
                Favorites boards
              </Link>
            </Button>
         </div>
    </div>
  )
}

export default OrgSidebar