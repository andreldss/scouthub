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
            "p-3 text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70 cursor-pointer focus:outline-none",
            variant === "primary" && "bg-[#070a08] border border-transparent hover:border-[#0F0F10] hover:text-content-body active:border-[#97979B]",
            variant === "secondary" && "bg-trnsparent border border-bg-[#3a5f4a] hover:border-[#fff] hover:text-content-body active:border-[#97979B]",
            props.className
        )}>
            {children}
        </button>
    )
}