'use client'

import { useOrganizationList } from "@clerk/nextjs"
import Link from 'next/link'
import { Item } from "./item";


function List() {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    if (!userMemberships.data?.length) return null;

  return (
    <ul className="flex flex-col space-y-4 mb-4">
        {userMemberships.data?.map((membership) => (
            <Item
                key={membership.organization.id}
                id={membership.organization.id}
                name={membership.organization.name}
                imageUrl={membership.organization.imageUrl}
            />
        ))}
        
    </ul>
  )
}

export default List