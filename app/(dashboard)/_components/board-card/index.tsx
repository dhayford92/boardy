"use client"
import Link from "next/link"
import Image from "next/image"
import Overlay from "./overlat"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Star, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Action } from "@/components/actions"

interface BoardCardProps {
    id: string,
    orgId: string,
    title: string,
    authorId: string,
    authorName: string,
    imageUrl: string,
    createdAt: number,
    isFavorite: boolean
};

function BoardCard({
    orgId,
    title,
    authorId,
    authorName,
    imageUrl,
    createdAt,
    isFavorite,
    id,
}: BoardCardProps) {
    const { userId } = useAuth();
    const [disabled, setDisable] = useState(false)

    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtlabel = formatDistanceToNow(createdAt, {
        addSuffix: true
    });

    const onClick = ()=> {

    }

  return (
    <Link href={`/board/${id}`}>
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-amber-50"> 
                <Image src={imageUrl} fill alt={title} className="absolute object-fit" />
                <Overlay/>
                <Action id={id} title={title} side="right">
                    <button title="actions" type="button" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                        <MoreHorizontal className="h-5 w-5 text-white opacity-75 hover:opacity-100 transition-opacity" />
                    </button>
                </Action>
            </div>
            <div className='relative bg-white p-3'>
                <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
                   {title} 
                </p>
                <p className='opacity-0 group-hover:opacity-100 transition-opacity text-xs truncate'>
                    {authorLabel}, {createdAtlabel}
                </p>
                <button 
                    title="Add To Favorite"
                    type='button'
                    disabled={disabled} 
                    onClick={onClick}  
                    className={cn("absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-600",
                        disabled && "cursor-not-allowed"
                    )}
                >
                    <Star className={cn("h-4 w-4",
                        isFavorite && "fill-blue-600 text-blue-600"
                    )} />
                </button>
            </div>
        </div>

    </Link>
  )
}

export default BoardCard