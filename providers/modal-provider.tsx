'use client'
import { useEffect, useState } from "react"
import { RenameModal }  from "@/components/modals/rename-modal"


export const ModalProvider = () => {
    const [ isMounted, setIsMounted ] = useState(false)

    if(!isMounted){
        return null;
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <>
            <RenameModal />
        </>
        
    )
}
