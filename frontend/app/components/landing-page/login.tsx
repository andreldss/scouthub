import TextInput from "../ui/text-input"
import Button from "../ui/button"


export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-[#3a5f4a] text-white p-8 rounded-lg gap-2 flex flex-col w-full max-w-md">
                <span>E-mail</span>
                <TextInput placeholder="E-mail"/>
                <span>Senha</span>
                <TextInput placeholder="Senha"/>
                <div className="flex flex-col gap-2 mt-5">
                    <Button variant="primary" className="w-full">Entrar</Button>
                    <Button variant="primary" className="w-full">Cadastrar</Button>
                </div>
            </div>
        </div>
    )
}