import { Loader } from 'lucide-react'
import {InfoSkeletonInfo} from './info'
import {ParticipantSkeleton} from './paticipants'
import Toolbar from './toolbar'

function CanvasLoading() {
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
      <Loader className='h-6 w-6 text-muted-foreground animate-spin'/>
      <InfoSkeletonInfo/>
      <ParticipantSkeleton/>
      <Toolbar.Skeleton/>
    </main>
  )
}

export default CanvasLoading