import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import { season } from "@/app/lib/config";

export function TeamsSelect({ league, onChange }: { league: string; onChange: (id: string) => void }) {

    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            if (!league) {
                setTeams([]);
                return;
            }

            try {
                const q = query( collection(db, "leagues", String(league), "seasons", String(season), "teams"),orderBy("name"));
                const querySnapshot = await getDocs(q);
                const result = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setTeams(result);
            } catch (error) {
                toast.error("Erro ao buscar times da liga selecionada!");
                console.error(error);
                setTeams([]);
            }
        }

        fetchLeagues();

    }, [league]);

    return (
        <>
            <Select onValueChange={onChange} disabled={!league}>
                <SelectTrigger className="w-[220px] text-gray-300">
                    <SelectValue placeholder="Selecione uma liga" />
                </SelectTrigger>
                <SelectContent>
                    {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                            <div className="flex items-center gap-2">
                                <img src={team.logo} alt={team.name} className="w-5 h-4" />
                                <span>{team.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Toaster
                position="top-right"
            />
        </>

    );
}
