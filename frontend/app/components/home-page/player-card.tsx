import Image from 'next/image'
import me from '@/public/me.jpeg'
import Button from '../ui/button';
import { AiOutlineBarChart } from "react-icons/ai";

type PlayerCardProps = {
  id: string,
  firstName: string,
  lastName: string,
  age: string,
  position: string,
  club: string,
  nationality: string,
  photo: string
}

export function PlayerCard({ id, firstName, lastName, age, position, club, nationality, photo }: PlayerCardProps) {
  return (
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
          <Button variant="secondary">+</Button>
        </div>
      </div>
    </div>
  );
}
