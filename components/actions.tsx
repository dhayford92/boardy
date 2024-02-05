'use client'

import { DropdownMenuContentProps, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModel from "@/app/(dashboard)/_components/confirm-model";
import { Button } from "./ui/button";
import { useRenameModel } from "@/store/use-rename-model";

interface Actionprops {
    children: React.ReactNode;
    side?: DropdownMenuContentProps['side'];
    sideOffset?: DropdownMenuContentProps['sideOffset'];
    id: string;
    title: string;
}

export const Action = ({ children, side, sideOffset, id, title }: Actionprops) => {
    const { onOpen } = useRenameModel();
    const { mutate, pending } = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
        .then(()=> toast.success(`Link to ${title} copied to clipboard`))
        .catch(()=> toast.error('Failed to copy link to clipboard'));
    }

    const onDelete = () => {
        mutate({ id })
        .then(()=> toast.success('Board deleted'))
        .catch(()=> toast.error('Failed to delete board'));
    }

    

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e)=>e.stopPropagation()} className="w-60" side={side} sideOffset={sideOffset}>
                <DropdownMenuItem
                    onClick={()=>onOpen( id, title )}
                    className="p-3 cursor-pointer flex items-center">
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onCopyLink}
                    className="p-3 cursor-pointer flex items-center">
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy board link
                </DropdownMenuItem>
                <ConfirmModel 
                    onConfirm={onDelete} 
                    header="Delete board" 
                    description="Are you sure you want to delete this board?">
                    <Button
                        variant='ghost'
                        className="p-3 cursor-pointer flex items-center justify-start text-red-400 w-full">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}