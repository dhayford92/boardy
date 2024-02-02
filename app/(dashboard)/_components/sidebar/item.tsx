"use client"

import Image from 'next/image'
import { useOrganizationList, useOrganization } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import Hint from '@/components/hint';

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
};

export function Item({ id, name, imageUrl }: ItemProps) {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const isActive = organization?.id === id;

    const handleClick = () => {
        if (!setActive) return;

        setActive({ organization: id });
    };

    return (
        <div className='aspect-square relative'>
            <Hint label={name} side='right' align="start" sideOffset={18}>
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    onClick={handleClick}
                    className={cn(
                        'rounded-md cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 hover:ring-2 hover:ring-white/50 hover:opacity-80 opacity-50',
                        isActive && 'ring-2 ring-white/50 opacity-100'
                    )}
                />
            </Hint>
        </div>
    )
}