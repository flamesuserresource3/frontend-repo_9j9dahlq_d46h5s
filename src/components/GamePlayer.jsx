import { useEffect, useMemo, useRef, useState } from 'react';

export default function GamePlayer({ currentGame }) {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            {currentGame ? currentGame.name : 'Pick a game to start playing'}
          </h2>
          {currentGame && (
            <span className="text-sm text-gray-500">{currentGame.description}</span>
          )}
        </div>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          {!currentGame ? (
            <div className="aspect-video flex items-center justify-center text-center p-8 text-gray-600">
              <div>
                <div className="text-5xl mb-3">🎮</div>
                <p className="max-w-md">
                  Choose any title from the gallery above and play instantly — no sign up, no ads.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6">
              {currentGame.id === 'tictactoe' && <TicTacToe />}
              {currentGame.id === 'snake' && <Snake />}
              {currentGame.id === 'rps' && <RockPaperScissors />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = useMemo(() => calculateWinner(board), [board]);

  function handleClick(i) {
    if (board[i] || winner) return;
    const next = board.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-sm font-medium text-gray-700">
          {winner ? (
            <span>
              Winner: <span className="font-bold text-indigo-600">{winner}</span>
            </span>
          ) : (
            <span>
              Turn: <span className="font-bold text-indigo-600">{xIsNext ? 'X' : 'O'}</span>
            </span>
          )}
        </div>
        <button onClick={reset} className="ml-auto inline-flex items-center rounded-md bg-indigo-600 text-white text-sm px-3 py-1.5 hover:bg-indigo-700">
          Reset
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 w-64">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="h-20 w-20 rounded-lg border border-gray-300 text-3xl font-bold text-gray-800 flex items-center justify-center hover:bg-indigo-50"
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function RockPaperScissors() {
  const options = ['Rock', 'Paper', 'Scissors'];
  const [player, setPlayer] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [result, setResult] = useState('Make your move!');

  function play(choice) {
    const cpuChoice = options[Math.floor(Math.random() * options.length)];
    setPlayer(choice);
    setCpu(cpuChoice);
    setResult(getResult(choice, cpuChoice));
  }

  function getResult(p, c) {
    if (p === c) return "It's a draw";
    if (
      (p === 'Rock' && c === 'Scissors') ||
      (p === 'Paper' && c === 'Rock') ||
      (p === 'Scissors' && c === 'Paper')
    )
      return 'You win!';
    return 'You lose';
  }

  return (
    <div className="max-w-md">
      <div className="flex gap-3 mb-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => play(opt)}
            className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:border-indigo-500 hover:text-indigo-600"
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
        <div className="flex items-center gap-2 mb-1"><span className="opacity-70">You:</span> <strong>{player ?? '-'}</strong></div>
        <div className="flex items-center gap-2 mb-2"><span className="opacity-70">CPU:</span> <strong>{cpu ?? '-'}</strong></div>
        <div className="text-center font-semibold text-indigo-600">{result}</div>
      </div>
    </div>
  );
}

function Snake() {
  const size = 16; // grid
  const [direction, setDirection] = useState('right');
  const [snake, setSnake] = useState([{ x: 4, y: 4 }]);
  const [food, setFood] = useState(randomFood(size, [{ x: 4, y: 4 }]));
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(140);
  const [score, setScore] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowUp' && direction !== 'down') setDirection('up');
      if (e.key === 'ArrowDown' && direction !== 'up') setDirection('down');
      if (e.key === 'ArrowLeft' && direction !== 'right') setDirection('left');
      if (e.key === 'ArrowRight' && direction !== 'left') setDirection('right');
      if (e.key === ' ') setRunning((r) => !r);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction]);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        if (direction === 'up') head.y -= 1;
        if (direction === 'down') head.y += 1;
        if (direction === 'left') head.x -= 1;
        if (direction === 'right') head.x += 1;

        // wall collision
        if (head.x < 0 || head.x >= size || head.y < 0 || head.y >= size) {
          setRunning(false);
          return [{ x: 4, y: 4 }];
        }
        // self collision
        if (prev.some((p) => p.x === head.x && p.y === head.y)) {
          setRunning(false);
          return [{ x: 4, y: 4 }];
        }

        const newSnake = [head, ...prev];
        // eat food
        if (head.x === food.x && head.y === food.y) {
          setFood(randomFood(size, newSnake));
          setScore((s) => s + 1);
          if (speed > 70) setSpeed((sp) => sp - 5);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [running, direction, size, food, speed]);

  function reset() {
    setDirection('right');
    setSnake([{ x: 4, y: 4 }]);
    setFood(randomFood(size, [{ x: 4, y: 4 }]));
    setScore(0);
    setSpeed(140);
    setRunning(false);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <div>
        <div
          className="grid bg-slate-100 rounded-lg p-2 border border-slate-200"
          style={{ gridTemplateColumns: `repeat(${size}, 1.25rem)` }}
        >
          {Array.from({ length: size * size }).map((_, i) => {
            const x = i % size;
            const y = Math.floor(i / size);
            const isSnake = snake.some((s) => s.x === x && s.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;
            return (
              <div
                key={i}
                className={`h-5 w-5 m-[1px] rounded-sm ${
                  isHead
                    ? 'bg-emerald-600'
                    : isSnake
                    ? 'bg-emerald-400'
                    : isFood
                    ? 'bg-rose-500'
                    : 'bg-white'
                }`}
              />
            );
          })}
        </div>
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRunning((r) => !r)}
            className="inline-flex items-center rounded-md bg-indigo-600 text-white text-sm px-3 py-1.5 hover:bg-indigo-700"
          >
            {running ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white text-sm px-3 py-1.5 hover:border-indigo-500"
          >
            Reset
          </button>
        </div>
        <div className="text-sm text-gray-600">Use arrow keys to move. Press space to pause/resume.</div>
        <div className="text-sm font-medium text-gray-800">Score: {score}</div>
      </div>
    </div>
  );
}

function randomFood(size, snake) {
  while (true) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    if (!snake.some((s) => s.x === x && s.y === y)) return { x, y };
  }
}
