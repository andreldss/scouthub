import axios from "axios";
import { season } from "../lib/config";

const api = axios.create({
  baseURL: "https://api-football-v1.p.rapidapi.com/v3",
  headers: {
    "x-rapidapi-key": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY!,
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
  },
});

export async function getLeaguesByCountry(country: string) {
  const response = await api.get("/leagues", { params: { country } });
  return response.data.response;
}

export async function getTeamsByLeague(league: string) {
  const response = await api.get("/teams", { params: { league, season } });
  return response.data.response;
}

export async function getPlayers(league: string, team?: string, search?: string) {
  const players: any[] = []
  let currentPage = 1;
  let totalPages = 1;

  do {
    const response = await api.get("/players", { params: { league, team, search, season, page: currentPage } });

    if (response.data.response) {
      players.push(...response.data.response)
    }

    totalPages = response.data.paging?.total || 1;
    currentPage++;
  }
  while (currentPage <= totalPages)

  return players;
}
