import { auth, db } from "@/app/lib/firebase";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ListCard } from "./list-card";

type Prop ={
    uid: string;
    refreshKey: number;
}

type List = {
    id: string;
    name: string;
    isDefault: boolean;
    players?: { id: string, firstName: string, lastName: string, photo: string }[];
};

export function ListContainer({ uid, refreshKey }: Prop) {

    const [lists, setLists] = useState<List[]>([]);

    useEffect(() => {

        const q = query(collection(db, "users", uid, "lists"),orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const lists = await Promise.all(
                snapshot.docs.map(async (doc) => {
                    const playersSnap = await getDocs(collection(db, "users", uid, "lists", doc.id, "players"));

                    const players = playersSnap.docs.map((p) => {
                    const data = p.data();

                    return {
                        id: p.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        photo: data.photo,
                        ...data,
                    }});

                    return {
                        id: doc.id,
                        name: doc.data().name || "-",
                        isDefault: doc.data().isDefault || false,
                        players,
                    };
                })
            );

            setLists(lists);
        });

        return () => unsubscribe();
    }, [uid, refreshKey]);

    return (
        <div className="flex flex-col items-center justify-center w-full gap-3">
            <h2 className="text-white text-lg font-semibold">Minhas listas</h2>

            {lists.map((list) => (
                <ListCard key={list.id} id={list.id} uid={uid} name={list.name} players={list.players} />
            ))}

            <button className="px-4 py-2 bg-gradient-to-br from-green-800 to-emerald-700 rounded text-white cursor-pointer">
                + Nova Lista
            </button>
        </div>
    );
}
