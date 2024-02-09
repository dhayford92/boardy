'use client'

import React, { useState } from 'react'
import Info from './info'
import Participants from './paticipants'
import Toolbar from './toolbar'
import { CanvasMode, CanvasState } from '@/types/canvas'
import { useCanRedo, useCanUndo, useHistory } from '@/liveblocks.config'


function Canvas({
  boardId}:{
    boardId: string
  }) {

    const [canvasState, setCanvasState] = useState<CanvasState>({
      mode: CanvasMode.None,
    })

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
        <Info boardId={boardId}/>
        <Participants/>
        <Toolbar
          canvasState={canvasState}
          setCanvasState={setCanvasState}
          canRedo={canRedo}
          canUndo={canUndo}
          undo={history.undo}
          redo={history.redo}
        />
    </main>
  )
}

export default Canvas