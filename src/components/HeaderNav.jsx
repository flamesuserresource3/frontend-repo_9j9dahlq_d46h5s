import { useState, useEffect } from 'react';

export default function HeaderNav({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const t = setTimeout(() => onSearch(query), 200);
    return () => clearTimeout(t);
  }, [query, onSearch]);

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-sm" />
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">
            FreePlay Arcade
          </h1>
        </div>
        <div className="ml-auto w-full sm:w-80">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔎</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/70"
            />
          </label>
        </div>
      </div>
    </header>
  );
}
