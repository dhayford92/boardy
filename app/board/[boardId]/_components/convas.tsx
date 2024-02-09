'use client'

import React, { useCallback, useState } from 'react'
import Info from './info'
import Participants from './paticipants'
import Toolbar from './toolbar'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import { useCanRedo, useCanUndo, useHistory, useMutation } from '@/liveblocks.config'
import {CursorsPresent} from './cursors-present'
import { pointerEventToCanvasPoint } from '@/lib/utils'


function Canvas({
  boardId}:{
    boardId: string
  }) {

    const [canvasState, setCanvasState] = useState<CanvasState>({
      mode: CanvasMode.None,
    })

    const [camera, setCamera] = useState<Camera>({x: 0, y: 0});

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const onWheel = useCallback((e: React.WheelEvent) => {
      setCamera((camera)=> ({
        x: camera.x - e.deltaX,
        y: camera.y - e.deltaY
      }))
    }, [])

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({ cursor: current});
    }, []);

    const onPointerLeave =  useMutation(({ setMyPresence }) =>{
      setMyPresence({ cursor: null});
    }, []);

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
        <svg 
          className='h-[100vh] w-[100vw]'
          onWheel={onWheel}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
            <g>
                <CursorsPresent/>
            </g>
        </svg>
    </main>
  )
}

export default Canvas