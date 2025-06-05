import Image from 'next/image'
import me from '@/public/me.jpeg'
import Button from '../ui/button';

export function PlayerCard() {
  return (
    <div className='flex flex-row gap-2'>
        <div>
            <Image src={me} alt='me' height={100} className='rounded'/>
        </div>
        <div className='flex flex-row justify-between w-full'>
          <div>
              <p className="text-white">Nome: Sobrenome: </p>
              <p className="text-white">Idade:</p>
              <p className="text-white">Clube: </p>
              <p className="text-white">Posicao: </p>
          </div>
          <div >
            <Button variant="secondary">+</Button>
          </div>
        </div>
    </div>
  );
}
