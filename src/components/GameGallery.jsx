export default function GameGallery({ games, onSelect, searchQuery, currentGameId }) {
  const filtered = games.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.tags.some((t) => t.includes(searchQuery.toLowerCase()))
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Trending Games</h2>
        <span className="text-sm text-gray-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelect(game.id)}
            className={`group text-left rounded-xl border transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              currentGameId === game.id ? 'border-indigo-500' : 'border-gray-200'
            }`}
          >
            <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-6xl">
              <span className="select-none" aria-hidden>
                {game.emoji}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600">
                  {game.name}
                </h3>
                <span className="ml-auto inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                  {game.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{game.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {game.tags.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-wide bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
