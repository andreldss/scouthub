import { cn } from "@/app/lib/utlils";

export default function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return(
        <input {...props} className={cn(`
           w-full p-3 bg-[#1e1e1e] text-white placeholder:text-content-placeholder rounded-xl
           border border-transparent hover:text-content-body active:border-[#97979B] focus:outline-none`,
        props.className
        )}/>
    )
}