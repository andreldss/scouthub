'use client'
import React, { useState } from 'react'
import { CountrySelect } from '@/app/components/home-page/country-select';
import { LeagueSelect } from '@/app/components/home-page/leagues-select';
import { TeamsSelect } from '@/app/components/home-page/teams-select';
import { ImportLeaguesButton } from '@/app/components/home-page/imports/import-league-button';
import { ImportTeamsButton } from '@/app/components/home-page/imports/import-teams-button';
import { SearchPlayersButton } from '@/app/components/home-page/search-button';
import TextInput from '@/app/components/ui/text-input';

export default function Home() {
    const [country, setCountry] = useState("");
    const [league, setLeague] = useState("");
    const [team, setTeam] = useState("");
    const [playerName, setPlayerName] = useState("")
    const [players, setPlayers] = useState<any[]>([]);

    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row gap-2'>
                    <CountrySelect onChange={(id) => setCountry(id)} />
                    <LeagueSelect country={country} onChange={(id) => setLeague(id)} />
                    <TeamsSelect league={league} onChange={(id) => setTeam(id)} />
                    <SearchPlayersButton league={league} team={team} search={playerName} onImport={(players) => {console.log(players); setPlayers(players);}}/>
                </div>
                <div>
                    <TextInput placeholder="Nome do jogador (mín. 4 caracteres)" value={playerName} onChange={(e) => setPlayerName(e.target.value)} disabled={!country && !league} className='bg-[#0a0a0a] w-full' />
                </div>
            </div>

            <div className='flex flex-row gap-2'>
                <ImportLeaguesButton country={country} />
                <ImportTeamsButton league={league} />
            </div>
        </div>
    );
}