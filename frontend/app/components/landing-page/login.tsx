'use client'
import TextInput from "../ui/text-input"
import Button from "../ui/button"
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';


export default function Login() {

    const router = useRouter()
    const notify = () => toast('Here is your toast.');

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gradient-to-br from-green-800 to-emerald-700 text-white p-8 rounded-lg gap-2 flex flex-col w-full max-w-md">
                <span>E-mail</span>
                <TextInput placeholder="E-mail"/>
                <span>Senha</span>
                <TextInput placeholder="Senha" type="password"/>
                <div className="flex flex-col gap-2 mt-5">
                    <Button variant="primary" className="w-full" onClick={notify}>Entrar</Button>
                    <Button variant="primary" className="w-full" onClick={() => router.push('/register')}>Cadastrar</Button>
                </div>
            </div>
            <Toaster 
            position="top-right"
            toastOptions={{
                className: '',
                style: {
                  border: '1px solidrgb(255, 255, 255)',
                  padding: '16px',
                  color: '#713200',
                },
              }}
            />
        </div>
    )
}