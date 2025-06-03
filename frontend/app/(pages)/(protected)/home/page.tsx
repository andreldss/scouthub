'use client'
import React, { useState } from 'react'
import { CountrySelect } from '@/app/components/home-page/country-select';
import { LeagueSelect } from '@/app/components/home-page/leagues-select';
import { ImportLeaguesButton } from '@/app/components/home-page/imports/import-league-button';

export default function Home() {
    const [country, setCountry] = useState("");
    const [league, setLeague] = useState("");
    
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <div className='flex flex-row gap-2'>
                <CountrySelect onChange={(id) => setCountry(id)}/>
                <LeagueSelect country={country} onChange={(id) => setLeague(id)} />
            </div>
            <div className='flex flex-row'>
                <ImportLeaguesButton country={country} />
            </div>
        </div>
    );
}