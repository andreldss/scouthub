'use client'
import React, { useEffect, useState } from 'react'
import { CountrySelect } from '@/app/components/home-page/country-select';
import { LeagueSelect } from '@/app/components/home-page/leagues-select';
import { TeamsSelect } from '@/app/components/home-page/teams-select';
import { ImportLeaguesButton } from '@/app/components/home-page/imports/import-league-button';
import { ImportTeamsButton } from '@/app/components/home-page/imports/import-teams-button';
import { SearchPlayersButton } from '@/app/components/home-page/search-button';
import { PlayersContainer } from '@/app/components/home-page/players-container';
import TextInput from '@/app/components/ui/text-input';
import { ListContainer } from '@/app/components/home-page-lists/lists-container';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/ui/button';

export default function Home() {
    const [country, setCountry] = useState("");
    const [league, setLeague] = useState("");
    const [team, setTeam] = useState("");
    const [playerName, setPlayerName] = useState("")
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)
    const [uid, setUid] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        <div className="flex items-center justify-center h-screen">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
    }

    if (!uid) {
        return (
            <div className="flex items-center justify-center h-screen">
                {loading ? <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" /> : <Button onClick={() => router.push('/')}>Ir para o login</Button>}
            </div>
        )
    }

    return (
        <div className='flex w-full h-screen flex-col md:flex-row'>
            <div className="w-full md:w-[25vw] flex flex-col items-center justify-center p-5">
                <div className='w-full h-full flex flex-col rounded'>
                    
                </div>
            </div>
            <div className="w-full md:w-[50vw] flex flex-col gap-2 items-center justify-center">
                <div className='flex flex-row gap-2'>
                    <ImportLeaguesButton country={country} />
                    <ImportTeamsButton league={league} />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2 justify-between'>
                        <CountrySelect onChange={(id) => setCountry(id)} />
                        <LeagueSelect country={country} onChange={(id) => setLeague(id)} />
                        <TeamsSelect league={league} onChange={(id) => setTeam(id)} />
                        <SearchPlayersButton league={league} team={team} search={playerName} onImport={(players) => { setPlayers(players); }} />
                    </div>
                    <div>
                        <TextInput placeholder="Nome do jogador (mín. 4 caracteres)" value={playerName} onChange={(e) => setPlayerName(e.target.value)} disabled={!country && !league} className='border-[#fff] w-full' />
                    </div>

                    <div className='mt-8'>
                        <PlayersContainer players={players} onPlayerAdded={() => setRefreshKey(k => k + 1)}/>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[25vw] flex flex-col items-center justify-center p-5">
                <div className='w-full h-full flex flex-col'>
                    <ListContainer uid={uid} refreshKey={refreshKey} />
                </div>
            </div>
        </div>
    );
}