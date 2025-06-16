import { db } from "@/app/lib/firebase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ListCard } from "./list-card";
import Modal from "../ui/modal";
import Button from "../ui/button";
import TextInput from "../ui/text-input";
import toast from "react-hot-toast";

type Prop ={
    uid: string;
    refreshKey: number;
}

type List = {
    id: string;
    name: string;
    isDefault: boolean;
    players?: { id: string, firstName: string, lastName: string, photo: string }[];
};

export function ListContainer({ uid, refreshKey }: Prop) {

    const [lists, setLists] = useState<List[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [listName, setListName] = useState('')

    useEffect(() => {

        const q = query(collection(db, "users", uid, "lists"),orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const lists = await Promise.all(
                snapshot.docs.map(async (doc) => {
                    const playersSnap = await getDocs(collection(db, "users", uid, "lists", doc.id, "players"));

                    const players = playersSnap.docs.map((p) => {
                    const data = p.data();

                    return {
                        id: p.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        photo: data.photo,
                        ...data,
                    }});

                    return {
                        id: doc.id,
                        name: doc.data().name || "-",
                        isDefault: doc.data().isDefault || false,
                        players,
                    };
                })
            );

            setLists(lists);
        });

        return () => unsubscribe();
    }, [uid, refreshKey]);

    async function handleCreateList(listName: string){
        if (!listName.trim()) {
            return toast.error('Favor preencher um nome.');
        }

        const exists = lists.some(
            (list) => list.name.toLowerCase() === listName.toLowerCase()
        );

        if (exists) return toast.error("Nome ja utilizado em uma lista!");

        await addDoc(collection(db, "users", uid, "lists"), {name: listName, createdAt: serverTimestamp(),isDefault: false,});

        setListName('');
        setIsModalOpen(false);
        toast.success('Lista criada com sucesso!');
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full gap-3">
                <h2 className="text-white text-lg font-semibold">Minhas listas</h2>

                {lists.map((list) => (
                    <ListCard key={list.id} id={list.id} uid={uid} name={list.name} players={list.players} />
                ))}

                <button className="px-4 py-2 bg-gradient-to-br from-green-800 to-emerald-700 rounded text-white cursor-pointer" onClick={() => setIsModalOpen(true)}>
                    + Nova Lista
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className='flex flex-col gap-3 w-full'>
                    <TextInput placeholder="Nome da lista" type="text" value={listName} onChange={(e) => setListName(e.target.value)} />
                    <Button variant='secondary' className='w-full' onClick={() => handleCreateList(listName)}>Criar lista</Button>
                </div>
                <Button onClick={() => setIsModalOpen(false)} className='mt-3'>Fechar</Button>
            </Modal>
        </>
    );
}
