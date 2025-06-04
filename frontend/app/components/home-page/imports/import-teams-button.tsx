"use client";

import { db } from "@/app/lib/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getTeamsByLeague } from "@/app/api/apiFootball";
import toast, { Toaster } from "react-hot-toast";
import { season } from "@/app/lib/config";

export function ImportTeamsButton({ league }: { league: string }) {

    const handleImport = async () => {

        console.log(league);

        if (!league) {
            toast.error(`Nenhuma liga selecionada!`);
            return;
        }


        const seasonRef = doc(db, "leagues", String(league), "seasons", String(season));
        const seasonSnap = await getDoc(seasonRef);
        const now = new Date();

        if (seasonSnap.exists()) {
            const lastImport =
                seasonSnap.data().lastImport?.toDate?.() ||
                new Date(seasonSnap.data().lastImport);

            const diffInDays = Math.floor(
                (now.getTime() - new Date(lastImport).getTime()) / (1000 * 60 * 60 * 24)
            );

            if (diffInDays < 30) {
                toast.error(`Você só pode importar os times dessa liga em ${30 - diffInDays} dias.`);
                return;
            }
        }

        const loading = toast.loading("Importando times...");

        try {
            const teams = await getTeamsByLeague(league);

            for (const item of teams) {
                const team = {
                    id: item.team.id,
                    name: item.team.name,
                    code: item.team.code,
                    logo: item.team.logo,
                    founded: item.team.founded,
                    country: item.team.country,
                    national: item.team.national,
                    venue: {
                        id: item.venue.id,
                        name: item.venue.name,
                        address: item.venue.address,
                        city: item.venue.city,
                        capacity: item.venue.capacity,
                        surface: item.venue.surface,
                        image: item.venue.image,
                    },
                };

                await setDoc(
                    doc(db, "leagues", String(league), "seasons", String(season), "teams", String(team.id)),
                    team
                );
            }

            await setDoc(seasonRef, { lastImport: now, totalTeams: teams.length, season: Number(season), }, { merge: true });

            toast.success(`${teams.length} times importadas com sucesso.`, {
                id: loading,
            });
        } catch (error) {
            console.error(error);
            toast.error("Erro ao importar ligas.", {
                id: loading,
            });
        }
    };

    return (
        <>
            <button onClick={handleImport} className="px-4 py-2 bg-gradient-to-br from-green-800 to-emerald-700 rounded text-white cursor-pointer">
                Importar Times
            </button>
            <Toaster position="top-right" />
        </>
    );
}
