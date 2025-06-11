type ListCardProps = {
    id: string,
    name: string
}

export function ListCard({ id, name }: ListCardProps) {

    return (
        <div key={id} className="text-white bg-[#222] p-2 rounded w-full cursor-pointer">
            {name}
        </div>
    );
}