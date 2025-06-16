import { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import Image from 'next/image'
import { AiOutlineDelete } from "react-icons/ai";

type ListCardProps = {
    id: string,
    uid: string; 
    name: string
    players?: { id: string, firstName: string, lastName: string, photo: string }[];
}

export function ListCard({ id, uid, name, players }: ListCardProps) {
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
                    {players?.map((player) => (
                        <div key={player.id} className="flex flex-row items-center gap-3 bg-[#222]">
                            <Image src={player.photo} alt='player-photo' height={40} width={40} className='rounded' />
                            <p className="text-white">{player.firstName} {player.lastName}</p>
                        </div>
                    ))}
                </div>
            }
            <div key={id} className="flex flex-row text-white bg-[#222] p-3 rounded w-full cursor-pointer justify-between hover:bg-[#363636] active:bg-[#454545]" onClick={handleOpen}>
                <p>{name}</p>
                <div className="flex gap-3">
                    <AiOutlineDelete onClick={()=> alert('teste')} />
                    {!isOpen ? <AiOutlineCaretDown className="mr-3" /> : <AiOutlineCaretUp className="mr-3" />}
                </div>
            </div>
        </div>
    );
}