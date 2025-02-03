import { GAMES } from '@/shared/types/games';

export default function GamePage({ params }: { params: { juego: string } }) {
  const game = GAMES.find(g => g.slug === params.juego);
  
  if (!game) return <div>Juego no encontrado</div>;

  return (
    <div>
      <h1>{game.name}</h1>
      {/* Contenido dinámico del juego */}
    </div>
  );
}
