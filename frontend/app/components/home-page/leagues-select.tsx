import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select";
import { getLeaguesByCountry } from "@/app/api/apiFootball";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import toast, { Toaster } from "react-hot-toast";

export function LeagueSelect({ country, onChange }: { country: string; onChange: (id: string) => void }) {

  const [leagues, setLeagues] = useState<any[]>([]);

  useEffect(() =>{
    const fetchLeagues = async () => {
      if (!country) {
        setLeagues([]);
        return;
      }

      try {
        const q = query(collection(db, "leagues"), where("country", "==", country), orderBy("country"), orderBy("id"));
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setLeagues(result);
      } catch (error) {
        toast.error("Erro ao buscar ligas do país selecionado!");
        console.error(error);
        setLeagues([]);
      } 
    }

    fetchLeagues(); 

  }, [country]);

  return (
    <>
      <Select onValueChange={onChange} disabled={!country}>
        <SelectTrigger className="w-[220px] text-gray-300">
          <SelectValue placeholder="Selecione uma liga" />
        </SelectTrigger>
        <SelectContent>
          {leagues.map((league) => (
            <SelectItem key={league.id} value={league.id}>
              <div className="flex items-center gap-2">
                <img src={league.logo} alt={league.name} className="w-5 h-4" />
                <span>{league.name}</span>
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
