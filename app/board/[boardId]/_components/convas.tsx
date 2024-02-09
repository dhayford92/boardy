'use client'

import React from 'react'
import Info from './info'
import Participants from './paticipants'
import Toolbar from './toolbar'


function Canvas({boardId}:{boardId: string}) {

 

  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
        <Info boardId={boardId}/>
        <Participants/>
        <Toolbar/>
    </main>
  )
}

export default Canvas