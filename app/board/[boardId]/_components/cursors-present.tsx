"use client"

import { useOthersConnectionIds } from "@/liveblocks.config";
import { memo } from "react"
import {Cursor} from "./cursor";


export const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => {
                return (
                    <Cursor
                        key={connectionId}
                        connectionId={connectionId}
                    />
                );
            })}
        </>
    )
}

export const CursorsPresent = memo(()=>{

    return (
        <>
            <Cursors/>
        </>
    )
});

CursorsPresent.displayName = "CursorsPresent";