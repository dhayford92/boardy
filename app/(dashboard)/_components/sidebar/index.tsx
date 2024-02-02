import React from 'react'
import NewButton from '../newbutton'
import List from './list'

export default function SideBar() {
  return (
    <aside className='fixed z-[1] left-0 bg-blue-950 h-full w-[60px] p-3 flex-col gap-y-4 text-white'>
      <List/>
      <NewButton/>
    </aside>
  )
}
