'use client'
import TextInput from "../ui/text-input"
import Button from "../ui/button"
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { login } from "@/app/lib/auth/login";
import toast, { Toaster } from 'react-hot-toast';
import { auth } from "@/app/lib/firebase";
import { sendEmailVerification } from "firebase/auth";

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [showResend, setShowResend] = useState(false);

    async function handleLogin() {
        setError('');
        setShowResend(false);

        if (!email || !password) {
            setError('Preencha todos os campos para logar!')
            return
        }

        const promise = login(email, password);

        toast.promise(promise, {
            loading: "Entrando...",
            success: "Login realizado com sucesso!",
            error: "Erro ao fazer login! Tente novamente."
        }, {
            success: {
                duration: 6000,
            }
        });

        try {
            await promise;
            router.push("/home");
        } catch (err: any) {
            switch (err.code) {
                case "auth/email-not-verified":
                    setError("Você precisa verificar seu e-mail antes de continuar.");
                    setShowResend(true);
                    break;
                case "auth/invalid-email":
                    setError("E-mail inválido.");
                    break;
                case "auth/user-not-found":
                    setError("Usuário não encontrado.");
                    break;
                case "auth/wrong-password":
                    setError("Senha incorreta.");
                    break;
                default:
                    setError("Erro ao fazer login. Tente novamente.");
                    console.error(err);
            }
        }
    }

    async function handleResendVerification() {
        const user = auth.currentUser;

        if (!user) {
            console.error("Nenhum usuário encontrado.");
            return;
        }

        try {
            await sendEmailVerification(user);
            toast.success("E-mail de verificação reenviado!");
            setShowResend(false);
            setError('');
        } catch (error: any) {
            if (error.code === "auth/too-many-requests") {
                toast.error("Espere um pouco antes de reenviar novamente.");
            } else {
                toast.error("Erro ao reenviar o e-mail.");
            }
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gradient-to-br from-green-800 to-emerald-700 text-white p-8 rounded-lg gap-2 flex flex-col w-full max-w-md">
                <span>E-mail</span>
                <TextInput placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Senha</span>
                <TextInput placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="flex flex-col gap-2 mt-5 items-center">
                    {error && <p className="text-[#6e0e13] font-bold text-center">{error}</p>}
                    {showResend && <p className="text-[#012103] font-bold text-center cursor-pointer hover:text-[#013302] active:text-[#014a03]" onClick={handleResendVerification}>Clique aqui para reenviar o e-mail</p>}
                    <Button variant="primary" className="w-full" onClick={handleLogin}>Entrar</Button>
                    <Button variant="primary" className="w-full" onClick={() => router.push('/register')}>Cadastrar</Button>
                </div>
            </div>
            <Toaster
                position="top-right"
            />
        </div>
    )
}