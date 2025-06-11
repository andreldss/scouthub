import { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

type ListCardProps = {
    id: string,
    name: string
    players?: string[];
}

export function ListCard({ id, name, players }: ListCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    function handleOpen() {

        if (isOpen) {
            setIsOpen(false)
        } else {
           setIsOpen(true) 
        }
    }

    return (
        <div className="flex flex-col w-full">
            {isOpen &&
                <div>
                  
                </div>
            }
            <div key={id} className="flex flex-row text-white bg-[#222] p-3 rounded w-full cursor-pointer justify-between hover:bg-[#363636] active:bg-[#454545]" onClick={handleOpen}>
                <p>{name}</p>
                {!isOpen ? <AiOutlineCaretDown className="mr-3" /> : <AiOutlineCaretUp className="mr-3" />}
            </div>
        </div>
    );
}