import React from 'react'
import ToolButton from './tool-button'
import { Circle, MousePointer2, Pen, Pencil, Redo2, Square, StickyNote, Type, Undo, Undo2 } from 'lucide-react'

function Toolbar() {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
        <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
            <ToolButton
                label='Selete'
                icon={MousePointer2}
                onClick={()=>{}}
                isActive={false}
            />
            <ToolButton
                label='Text'
                icon={Type}
                onClick={()=>{}}
                isActive={true}
            />
            <ToolButton
                label='Sticky Note'
                icon={StickyNote}
                onClick={()=>{}}
                isActive={false}
            />
            <ToolButton
                label='Rectangle'
                icon={Square}
                onClick={()=>{}}
                isActive={false}
            />
            <ToolButton
                label='Ellipse'
                icon={Circle}
                onClick={()=>{}}
                isActive={false}
            />
            <ToolButton
                label='Pene'
                icon={Pencil}
                onClick={()=>{}}
                isActive={false}
            />
        </div>
        <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
            <ToolButton
                label='Undo'
                icon={Undo2}
                onClick={()=>{}}
                isActive={false}
            />
            <ToolButton
                label='Redo'
                icon={Redo2}
                onClick={()=>{}}
                isActive={false}
            />
        </div>
</div>
  )
}

export default Toolbar


Toolbar.Skeleton = function ToolbarSkeleton(){
    return (
        <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md'/>
    )
}