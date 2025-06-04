"use client";

import { db } from "@/app/lib/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getLeaguesByCountry } from "@/app/api/apiFootball";
import toast, { Toaster } from "react-hot-toast";
import { writeBatch } from "firebase/firestore";

export function ImportLeaguesButton({ country }: { country: string }) {

  const handleImport = async () => {

    console.log(country)

    if (!country) {
      toast.error(`Nenhum país selecionado!`);
      return;
    }

    const controlRef = doc(collection(db, "import_control"), "leagues");
    const controlSnap = await getDoc(controlRef);
    const now = new Date();

    if (controlSnap.exists()) {
      const lastImport = controlSnap.data().lastImport?.toDate?.() || new Date(controlSnap.data().lastImport);
      const diffInDays = Math.floor((now.getTime() - new Date(lastImport).getTime()) / (1000 * 60 * 60 * 24));

      if (diffInDays < 30) {
        toast.error(`Você só pode importar as ligas em ${30 - diffInDays} dias.`);
        return;
      }
    }

    const loading = toast.loading("Importando ligas...");

    try {
      const leagues = await getLeaguesByCountry(country);
      const batch = writeBatch(db);

      for (const item of leagues) {
        const league = {
          id: item.league.id,
          name: item.league.name,
          logo: item.league.logo,
          type: item.league.type,
          country: item.country.name,
          countryCode: item.country.code,
          flag: item.country.flag,
        };

        const leagueRef = doc(collection(db, "leagues"), String(league.id));
        batch.set(leagueRef, league, { merge: true });
      }

      await batch.commit();
      await setDoc(controlRef, { lastImport: now })

      toast.success(`${leagues.length} ligas importadas com sucesso.`, {
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
        Importar Ligas
      </button>
      <Toaster position="top-right" />
    </>
  );
}
