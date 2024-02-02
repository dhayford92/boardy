'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner"
import { useQuery } from "convex/react";
import BoardCard from "./board-card";
import NewBoardButton from "./new-board-button";
import { Skeleton } from "@/components/ui/skeleton"





interface BordListProps{
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
};

export default function BordList({ orgId, query }: BordListProps) {
    const { organization } = useOrganization()
    const {mutate, pending} = useApiMutation(api.board.create)

    const onClick = () => {
        if(!organization) return;

        mutate({
            title: "Untitled",
            orgId: organization.id
        }).then((result)=>{
            toast.success("Board created");
        }).catch((error)=>{
            toast.error("Failed to create board")
        })
    };

    const data = useQuery(api.boards.get, { orgId });

    if(data === undefined){
        return (
            <div>
                <h2 className="text-2xl">
                    {query.favorites ? "Favorite Boards": "Team Board"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <NewBoardButton orgId={orgId} disabled/>
                    <Skeleton className="aspect-[100/127] border rounded-lg overflow-hidden" />
                    <Skeleton className="aspect-[100/127] border rounded-lg overflow-hidden" />
                    <Skeleton className="aspect-[100/127] border rounded-lg overflow-hidden" />
                    <Skeleton className="aspect-[100/127] border rounded-lg overflow-hidden" />
                </div>
            </div>
        )
    }

    if(!data?.length && query.search){
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <Image src='/empty-search.svg' alt="Empty" height={140} width={140}/>
                <h2 className="text-2xl font-semibold mt-6">
                    No results found!
                </h2>
                <p className="text-muted-foregroud text-sm mt-2">
                    Try searching for something else!
                </p>
            </div>
        )
    }

    if(!data?.length && query.favorites){
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <Image src='/empty-fav.svg' alt="Empty favorites" height={140} width={140}/>
                <h2 className="text-2xl font-semibold mt-6">
                    No favorite boards!
                </h2>
                <p className="text-muted-foregroud text-sm mt-2">
                    Try adding your favorite boards.
                </p>
            </div>
        )
    }

    if(!data?.length){
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <Image src='/empty-note.svg' alt="Empty Note" height={110} width={110}/>
                <h2 className="text-2xl font-semibold mt-6">
                    Create your first board!
                </h2>
                <p className="text-muted-foregroud text-sm mt-2">
                    Start by creating a board for your organization
                </p>
                <div className="mt-6">
                    <Button disabled={pending} onClick={onClick} size='lg'>Create Board</Button>
                </div>
            </div>
        )
    }

  return (
    <div>
        <h2 className="text-2xl">
            {query.favorites ? "Favorite Boards": "Team Board"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
            <NewBoardButton orgId={orgId}/>
            {data.map((board)=>(
                <BoardCard 
                    key={board._id}
                    id={board._id}
                    title={board.title}
                    imageUrl={board.imageUrl}
                    authorId={board.authorId}
                    authorName={board.authorName}
                    createdAt={board._creationTime}
                    orgId={board.orgId}
                    isFavorite={false}
                />
            ))}
        </div>
    </div>
  )
}
