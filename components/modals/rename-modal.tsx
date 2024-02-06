import { useRenameModel } from "@/store/use-rename-model"
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogClose, DialogHeader, DialogDescription } from "../ui/dialog"
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


export const RenameModal = () => {
    const { isOpen, onClose, initialValues } = useRenameModel();
    const { mutate, pending } = useApiMutation(api.board.update);
    const [ title, setTitle ] = useState(initialValues.title);

    useEffect(()=> {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSumbit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    
        mutate({ id: initialValues.id, title })
        .then(()=> {
            toast.success('Board title updated');
            onClose();
        }).catch(()=> toast.error('Failed to update board title'));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit board title</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for the board
                </DialogDescription>
                <form onSubmit={onSumbit} className="space-y-4">
                    <Input 
                        disabled={pending}
                        required
                        maxLength={60}
                        placeholder="Board title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)} 
                    />
                    <DialogFooter >
                        <DialogClose asChild>
                            <Button type='button' variant='outline'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={
                                (title === initialValues.title) || (title.length === 0) || pending
                            }
                            type='submit'>
                            Save
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}