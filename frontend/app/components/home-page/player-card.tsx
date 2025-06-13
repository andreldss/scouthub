import Image from 'next/image'
import Button from '../ui/button';
import { AiOutlineBarChart } from "react-icons/ai";
import { useEffect, useState } from 'react';
import Modal from '../ui/modal';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase';
import toast from 'react-hot-toast';

type PlayerCardProps = {
  id: string,
  firstName: string,
  lastName: string,
  age: string,
  position: string,
  club: string,
  nationality: string,
  photo: string
  onPlayerAdded?: () => void;
}

type List = {
  id: string;
  name: string;
};

export function PlayerCard({ id, firstName, lastName, age, position, club, nationality, photo, onPlayerAdded  }: PlayerCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [lists, setLists] = useState<List[]>([])
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchLists = async () => {
      if (!uid) return;

      try {
        const ref = collection(db, 'users', uid, 'lists');
        const docs = (await getDocs(ref)).docs;

        const result = docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as List[];

        setLists(result);
      } catch (err) {
        console.error(err);
      }
    };

    if (isModalOpen) {
      fetchLists();
    }
  }, [isModalOpen])

  async function handleAddToList(listId: string) {
    if (!uid) return;

    const loading = toast.loading("Adicionando jogador à lista...");

    try {
      await setDoc(doc(db, 'users', uid, 'lists', listId, 'players', String(id)), { playerId: id, firstName, lastName, photo });
      setIsModalOpen(false);
      toast.success(`Jogador adicionado com sucesso!`, {
        id: loading,
      });

      onPlayerAdded?.();
    } catch (error) {
      console.error(error);
      toast.error(`Erro ao adicionar jogador.`, {
        id: loading,
      });
    }
  }

  return (
    <>
      <div className='flex flex-row gap-2 mb-5'>
        <div className='flex flex-row'>
          <Button variant="secondary">
            <AiOutlineBarChart />
          </Button>
        </div>
        <div className='flex'>
          <Image src={photo} alt='player-photo' height={120} width={120} className='rounded' />
        </div>
        <div className='flex flex-row justify-between w-full'>
          <div>
            <p className="text-white">Nome: {firstName} | Sobrenome: {lastName} </p>
            <p className="text-white">Idade: {age}</p>
            <p className="text-white">Clube: {club}</p>
            <p className="text-white">Posicao: {position}</p>
          </div>
          <div className='justify-center flex flex-row' >
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>+</Button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-white text-lg mb-4">Adicionar {firstName} a uma lista:</h2>
        {lists && lists.map((list) => (
          <div key={list.id} className='flex flex-col gap-3 w-full'>
            <Button variant='secondary' className='w-full' onClick={() => handleAddToList(list.id)}>{list.name}</Button>
          </div>
        ))}
        <Button onClick={() => setIsModalOpen(false)} className='mt-3'>Fechar</Button>
      </Modal>
    </>

  );
}
