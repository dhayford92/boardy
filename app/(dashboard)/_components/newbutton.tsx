'use client'

import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"
import { Dialog,  DialogContent, DialogTrigger} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";

export default function NewButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint label="Create New Organization" side='right' align="start" sideOffset={18}>
            <Button className="bg-white/25 w-full h-full px-2">
                <Plus className='text-white'/>
            </Button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization/>
      </DialogContent>
    </Dialog>
  )
}

