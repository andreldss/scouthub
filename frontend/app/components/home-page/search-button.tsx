"use client";

import { getPlayers } from "@/app/api/apiFootball";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";


export function SearchPlayersButton({ league, team, search, onImport }: { league: string; team: string; search: string; onImport: (players: any[]) => void }) {

  const handleImport = async () => {

    if (!league) {
        toast.error(`Nenhuma liga selecionada!`);
        return;
    }

    const loading = toast.loading("Carregando jogadores...");

    try {
      const players = await getPlayers(league, team || undefined, search.trim() || undefined);

      onImport(players)
      toast.success(`${players.length} jogares carregados com sucesso.`, {
        id: loading,
      });

    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar jogadores.", {
        id: loading,
      });
    }
  };

  return (
    <>
      <button onClick={handleImport} className="px-4 py-2 bg-gradient-to-br from-green-800 to-emerald-700 rounded text-white cursor-pointer">
        <AiOutlineSearch />
      </button>
      
      <Toaster position="top-right" />
    </>
  );
}
