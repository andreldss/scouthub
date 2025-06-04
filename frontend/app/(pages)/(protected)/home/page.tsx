'use client'
import React, { useState } from 'react'
import { CountrySelect } from '@/app/components/home-page/country-select';
import { LeagueSelect } from '@/app/components/home-page/leagues-select';
import { TeamsSelect } from '@/app/components/home-page/teams-select';
import { ImportLeaguesButton } from '@/app/components/home-page/imports/import-league-button';
import { ImportTeamsButton } from '@/app/components/home-page/imports/import-teams-button';
import TextInput from '@/app/components/ui/text-input';
import Button from '@/app/components/ui/button';
import { AiOutlineSearch } from "react-icons/ai";


export default function Home() {
    const [country, setCountry] = useState("");
    const [league, setLeague] = useState("");
    const [team, setTeam] = useState("");
    const [playerName, setPlayerName] = useState("")

    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row gap-2'>
                    <CountrySelect onChange={(id) => setCountry(id)} />
                    <LeagueSelect country={country} onChange={(id) => setLeague(id)} />
                    <TeamsSelect league={league} onChange={(id) => setTeam(id)} />
                    <Button className='px-4 py-2 bg-gradient-to-br from-green-800 to-emerald-700 rounded cursor-pointer'>
                        <AiOutlineSearch />
                    </Button> 
                </div>
                <div>
                    <TextInput placeholder="Nome do jogador (min. 4 caracteres)" value={playerName} onChange={(e) => setPlayerName(e.target.value)} disabled={!country && !league && !team} className='bg-[#0a0a0a] w-full' />
                </div>
            </div>

            <div className='flex flex-row gap-2'>
                <ImportLeaguesButton country={country} />
                <ImportTeamsButton league={league} />
            </div>
        </div>
    );
}