'use client'
import TextInput from "../ui/text-input"
import Button from "../ui/button"
import { useRouter } from 'next/navigation'
import { register } from "@/app/lib/auth/register"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';


export default function Register() {

    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')

    async function handleRegister() {
        setError('');

        if (!name || !email || !password || !confirmpassword) {
            setError('Favor preencher todos os campos!')
            return;
        }

        if (password != confirmpassword) {
            setError('As senhas não coincidem!')
            return;
        }

        const promise = register(name, email, password);

        toast.promise(promise, {
            loading: 'Espere um momento...',
            success: `Conta criada com sucesso! Verfique seu e-mail para ativar sua conta.`,
            error: 'Erro ao registrar. Verifique os dados.',
        }, {
            success: {
                duration: 6000,
            }
        });

        try {
            await promise;
            router.push('/')
        } catch (err: any) {

            switch (err.code) {
                case "auth/email-already-in-use":
                    setError("Este e-mail já está em uso!");
                    break;
                case "auth/invalid-email":
                    setError("E-mail invalido!");
                    break;
                case "auth/weak-password":
                    setError("A senha deve ter pelo menos 6 caracteres!");
                    break;
                default:
                    setError("Erro ao registrar. Tente novamente!");
                    console.error(err);
            }
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gradient-to-br from-green-800 to-emerald-700 text-white p-8 rounded-lg gap-2 flex flex-col w-full max-w-md">
                <span>Nome completo</span>
                <TextInput placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
                <span>E-mail</span>
                <TextInput placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Senha</span>
                <TextInput placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span>Confirmar senha</span>
                <TextInput placeholder="Confirmar senha" type="password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <div className="flex flex-col gap-2 mt-5 items-center">
                    {error && <p className="text-[#6e0e13] font-bold text-center">{error}</p>}
                    <Button variant="primary" className="w-full" onClick={handleRegister}>Criar conta</Button>
                    <Button variant="primary" className="w-full" onClick={() => router.push('/')}>Ja tenho conta</Button>
                </div>
            </div>
            <Toaster
                position="top-right"
            />
        </div>
    )
}