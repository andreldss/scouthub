import Image from 'next/image'
import me from '@/public/me.jpeg'
import Button from '../ui/button';
import { AiOutlineBarChart } from "react-icons/ai";

export function PlayerCard(id: string, firstName: string, lastName: string, age: string, position: string, club: string, nationality: string) {
  return (
    <div className='flex flex-row gap-2'>
      <div className='flex flex-row'>
        <Button variant="secondary">
          <AiOutlineBarChart />
        </Button>
      </div>
      <div className='flex'>
        <Image src={me} alt='me' height={100} className='rounded' />
      </div>
      <div className='flex flex-row justify-between w-full'>
        <div>
          <p className="text-white">Nome: {firstName} Sobrenome: {lastName} <Image src={nationality} alt='nation' /> </p>
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
