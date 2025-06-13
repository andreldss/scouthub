import { PlayerCard } from "./player-card";

type PlayersContainerProps = {
  players: any[]
  onPlayerAdded?: () => void;
}

export function PlayersContainer({ players, onPlayerAdded }: PlayersContainerProps) {
  if (!players.length) return null;

  return (
    <div className="bg-[#0a0a0a] p-5 rounded">
      <div className="bg-[#0a0a0a] w-full max-h-[500px] overflow-y-auto rounded p-5 flex flex-col gap-4">
        {players.map((item) => {
          const { player, statistics } = item;
          const stat = statistics[0];

          return (
            <PlayerCard
              key={player.id}
              age={player.age}
              club={stat?.team.name}
              firstName={player.firstname}
              lastName={player.lastname}
              id={player.id}
              nationality={player.nationality}
              photo={player.photo}
              position={stat?.games?.position || '-'}
              onPlayerAdded={onPlayerAdded}
            />
          )
        })}
      </div>
    </div>
  );
}
