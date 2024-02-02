"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { cn } from '@/lib/utils'
import { useOrganization } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'


function NewBoardButton({orgId, disabled}: { orgId: string, disabled?: boolean}) {
    const { organization } = useOrganization()
    const {mutate, pending} = useApiMutation(api.board.create)

  return (
    <button
        type='button'
        disabled={disabled}
        onClick={()=>{
            if(!organization) return;

            mutate({
                title: "Untitled",
                orgId: organization.id
            }).then((result)=>{
                toast.success("Board created");
            }).catch((error)=>{
                toast.error("Failed to create board")
            })
        }}
        className={
            cn("col-span-1 aspect-[100/127] bg-blue-600 hover:bg-blue-800 flex flex-col items-center justify-center py-6 rounded-lg",
            (disabled || pending) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
        )}
    >
        <div/>
        <Plus className='h-12 w-12 text-white stroke-1'/>
        <p className='text-sm text-white font-light'>
            New Board
        </p>
        
    </button>
  )
}

export default NewBoardButton