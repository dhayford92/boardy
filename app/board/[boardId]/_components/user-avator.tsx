import Hint from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatorProps {
    src?: string;
    name?: string;
    fallback?: string;
    borderColor?: string;
};


export const UserAvator = ({
    src, name, fallback, borderColor
}: UserAvatorProps) => {
    return (
        <Hint label={name || "Teammate"} side="bottom" sideOffset={10} >
            <Avatar 
                className="h-8 boarder-2"
                style={{borderColor }}>
                    <AvatarImage src={src}/>
                    <AvatarFallback>``
                        {fallback}
                    </AvatarFallback>
            </Avatar>
        </Hint>
    )
}