"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useRenameModel } from "@/store/use-rename-model";
import { Action } from "@/components/actions";
import { Menu } from "lucide-react"
import Hint from "@/components/hint";


interface InfoProps {
  boardId: string;
}





function Info({ boardId }: InfoProps) {
  const { onOpen } = useRenameModel()
  const route = useRouter()
  const data = useQuery(api.board.get, { id: boardId as Id<"boards">})

  if(!data) return <InfoSkeletonInfo/>

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint label="View All Boards" side="bottom" sideOffset={10}>
        <Button
          onClick={()=>route.push('/')}
          variant='board' className="px-2 relative w-36">
            <Image src='/logo.png' alt="logo" fill className="object-cover"/>
        </Button>
      </Hint>
      <Separator orientation="vertical" className="my-2"/>
      <Hint label="Rename Board" side="bottom" sideOffset={10}>
        <Button 
          variant='board'
          onClick={()=> onOpen(data._id, data.title)}
          className="text-base font-normal px-2">
          {data.title}
        </Button>
      </Hint>
      <Separator orientation="vertical" className="my-2"/>
      <Action
        id={data._id}
        title={data.title}
        side='bottom'
        sideOffset={10}>
          <div>
            <Hint label="Main Menu" side="bottom" sideOffset={10}>
              <Button 
                  variant='board'
                  size='icon'>
                  <Menu/>
              </Button>
            </Hint>
          </div>
      </Action>
    </div>
  )
}

export default Info


export function InfoSkeletonInfo() {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]'/>
  )
}
