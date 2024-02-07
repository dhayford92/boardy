"use clinet"

import qs from 'query-string'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'usehooks-ts'
import { useState, useEffect, ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'


export default function SearchInput() {
    const router = useRouter();
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const url = qs.stringify({ 
            url: "/",
            query: { search: debouncedSearch }
         },
            { skipEmptyString: true, skipNull: true }
        );
        
        // router.prefetch(url)
    }, [debouncedSearch, router])

  return (
    <div className='w-full relative'>
        <Search className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4'/>
        <Input
            type='text'
            className='pl-9 w-full max-w-[516px]'
            placeholder='Search boards'
            value={search}
            onChange={handleChange}
        />
        
    </div>
  )
}
