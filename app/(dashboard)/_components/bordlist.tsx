'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";


interface BordListProps{
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
};

export default function BordList({ orgId, query }: BordListProps) {
    const { organization } = useOrganization()
    const create = useMutation(api.boards.create)

    const onClick = () => {
        if(!organization) return;
        create({
            title: "Untitled",
            orgId: organization.id
        })
    };

    const data = [];

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
                    <Button onClick={onClick} size='lg'>Create Board</Button>
                </div>
            </div>
        )
    }

  return (
    <div>
        
    </div>
  )
}
