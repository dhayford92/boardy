import Image from "next/image"
import { CreateOrganization } from "@clerk/nextjs"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function EmptyOrg() {
  return (
    <div className='h-full flex flex-col items-center justify-center pt-10'>
        <Image src='/elements.svg' alt="Empty" height={200} width={200}/>

        <h2 className="text-2xl font-semibold mt-6">
          Welcome to Boardy
        </h2>

        <p className="text-muted-foregroud text-sm mt-2">
          Create organization to get started
        </p>

        <div className="mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button size='lg'>Create organization</Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-x-[430px]">
              <CreateOrganization/>
            </DialogContent>
          </Dialog>
        </div>
    </div>
  )
}

export default EmptyOrg