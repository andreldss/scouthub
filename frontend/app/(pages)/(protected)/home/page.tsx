'use client'
import React, { useState } from 'react'
import { CountrySelect } from '@/app/components/home-page/country-select';
import { ImportLeaguesButton } from '@/app/components/home-page/imports/import-league-button';

export default function Home() {
    const [selected, setSelected] = useState("Brazil");
    
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <div className='flex flex-row'>
                <CountrySelect onChange={(id) => setSelected(id)}/>
            </div>
            <div className='flex flex-row'>
                <ImportLeaguesButton country={selected} />
            </div>
        </div>
    );
}