import { cn } from "@/app/lib/utils";

export default function Button({
    children,
    variant = "primary",
    ...props
}: {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {


    return(
        <button {...props}
        className={cn(
            "p-3 text-white rounded font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70 cursor-pointer focus:outline-none",
            variant === "primary" && "px-4 py-2 bg-[#070a08] border border-transparent hover:border-[#0F0F10] hover:text-content-body active:border-[#97979B]",
            variant === "secondary" && "px-4 py-2 bg-gradient-to-br from-green-800 to-emerald-700 rounded text-white cursor-pointer hover:border-[#fff] hover:text-content-body active:border-[#97979B]",
            props.className
        )}>
            {children}
        </button>
    )
}