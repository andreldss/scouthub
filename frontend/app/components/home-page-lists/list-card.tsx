import { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import Image from 'next/image'
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../ui/modal";
import Button from "../ui/button";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { AiOutlineBarChart } from "react-icons/ai";


type ListCardProps = {
    id: string,
    uid: string,
    name: string,
    isDefault: boolean;
    players?: { id: string, firstName: string, lastName: string, photo: string }[];
    setRefreshKey: (value: (prev: number) => number) => void;
}

export function ListCard({ id, uid, name, players, isDefault, setRefreshKey }: ListCardProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalOpened , setModalOpened] = useState('')
    const [playerDeleted, setPlayerDeleted] = useState('')

    function handleOpen() {

        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }

    async function handleDeleteList(id: string) {
        if (!id) return toast.error('Lista não identificada. Tente novamente.');

        if (isDefault) return toast.error('Não é permitido apagar a lista de favoritos!')
        try{
            await deleteDoc(doc(db, "users", uid, "lists", id));
        } catch(err) {
            console.log(err);
            toast.error('Erro ao deletar lista.')
        }

        setIsModalOpen(false);
        toast.success('Lista deletada com sucesso!');
    }   

    async function handleDeletePlayer(player: string) {
        if (!player) return toast.error('Jogador não identificada. Tente novamente.');

        try{
            await deleteDoc(doc(db, "users", uid, "lists", id, "players", player));
        } catch(err) {
            console.log(err);
            toast.error('Erro ao deletar jogador.')
        }

        setPlayerDeleted('')
        setIsModalOpen(false);
        toast.success('Jogador deletado da lista com sucesso!');
        setRefreshKey(prev => prev + 1);
    }

    return (
        <>
            <div className="flex flex-col w-full">
                {isOpen && 
                    <div>
                        {players?.map((player) => (
                            <div key={player.id} className="flex flex-row items-center mt-1 bg-[#222] justify-between">
                                <div className="flex flex-row items-center gap-3">
                                    <Image src={player.photo} alt='player-photo' height={40} width={40} className='rounded' />
                                    <p className="text-white">{player.firstName} {player.lastName}</p>
                                </div>
                                <div className="flex text-white gap-3 text-xl">
                                    <AiOutlineBarChart className='cursor-pointer' />
                                    <AiOutlineFolderOpen className='cursor-pointer' onClick={()=> {setIsModalOpen(true); setModalOpened('add-media')}} />
                                    <AiOutlineDelete className='cursor-pointer' onClick={()=> {setIsModalOpen(true); setModalOpened('delete-player'); setPlayerDeleted(player.id)}} />
                                </div>
                            </div>
                        ))}
                    </div>
                }
                <div key={id} className="flex flex-row text-white bg-[#222] p-3 rounded w-full cursor-pointer justify-between hover:bg-[#363636] active:bg-[#454545]" onClick={handleOpen}>
                    <p>{name}</p>
                    <div className="flex gap-3 text-xl">
                        <AiOutlineDelete onClick={(e)=> {e.stopPropagation();setIsModalOpen(true); setModalOpened('delete-list')}} />
                        {!isOpen ? <AiOutlineCaretDown className="mr-3" /> : <AiOutlineCaretUp className="mr-3" />}
                    </div>
                </div>
            </div>
            {modalOpened === 'delete-list' &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                    <div className="flex flex-col gap-3 items-center">
                        <p className="text-white text-xl">Deseja mesmo deletar a lista {name}?</p>

                        <div className="flex gap-3">
                            <Button variant='secondary' onClick={()=> handleDeleteList(id)}>Confirmar</Button>
                            <Button onClick={() => setIsModalOpen(false)}>Fechar</Button>
                        </div>
                    </div>
                </Modal>
            }
            {modalOpened === 'delete-player' &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="flex flex-col gap-3 items-center">
                        <p className="text-white text-xl">Deseja mesmo deletar o jogador da lista?</p>

                        <div className="flex gap-3">
                            <Button variant='secondary' onClick={()=> handleDeletePlayer(playerDeleted)}>Confirmar</Button>
                            <Button onClick={() => setIsModalOpen(false)}>Fechar</Button>
                        </div>
                    </div>
                </Modal>
            }
            {modalOpened === 'add-media' &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="flex flex-col gap-3 items-center">
                        <p className="text-white text-xl">apenas um teste hehe</p>

                        <div className="flex gap-3">
                            <Button onClick={() => setIsModalOpen(false)}>Fechar</Button>
                        </div>
                    </div>
                </Modal>
            }
        </>

    );
}