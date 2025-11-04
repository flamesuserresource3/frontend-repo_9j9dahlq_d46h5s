import { useMemo, useState } from 'react';
import HeaderNav from './components/HeaderNav.jsx';
import GameGallery from './components/GameGallery.jsx';
import GamePlayer from './components/GamePlayer.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const games = useMemo(
    () => [
      {
        id: 'tictactoe',
        name: 'Tic Tac Toe',
        emoji: '❌⭕',
        description: 'Classic 3×3 duel. Get three in a row to win.',
        difficulty: 'Easy',
        tags: ['board', 'two-player', 'classic'],
      },
      {
        id: 'snake',
        name: 'Snake',
        emoji: '🐍',
        description: 'Eat the food, dodge your tail. Simple and addictive.',
        difficulty: 'Medium',
        tags: ['arcade', 'retro', 'skill'],
      },
      {
        id: 'rps',
        name: 'Rock · Paper · Scissors',
        emoji: '🪨📄✂️',
        description: 'Best of luck versus the CPU. Rock beats scissors!',
        difficulty: 'Easy',
        tags: ['casual', 'quick', 'luck'],
      },
    ],
    []
  );

  const [currentGameId, setCurrentGameId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentGame = useMemo(
    () => games.find((g) => g.id === currentGameId) || null,
    [games, currentGameId]
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeaderNav onSearch={setSearchQuery} />

      <main className="flex-1">
        <GameGallery
          games={games}
          onSelect={setCurrentGameId}
          searchQuery={searchQuery}
          currentGameId={currentGameId}
        />

        <GamePlayer currentGame={currentGame} />
      </main>

      <Footer />
    </div>
  );
}
