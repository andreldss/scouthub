import { auth, db } from "@/app/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ListCard } from "./list-card";

type List = {
    id: string;
    name: string;
    isDefault: boolean;
    players: any[];
};

export function ListContainer() {

    const [lists, setLists] = useState<List[]>([]);

    useEffect(() => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const q = query(
            collection(db, 'users', uid, 'lists'),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const result = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as List[];

            setLists(result);
        });

        return () => unsubscribe();
    }, [auth.currentUser?.uid]);

    return (
        <div className="flex flex-col items-center justify-center w-full gap-3">
            <h2 className="text-white text-lg font-semibold">Minhas listas</h2>

            {lists.map((list) => (
                <ListCard key={list.id} id={list.id} name={list.name} />
            ))}

            <button className="px-4 py-2 bg-gradient-to-br from-green-800 to-emerald-700 rounded text-white cursor-pointer">
                + Nova Lista
            </button>
        </div>
    );
}
