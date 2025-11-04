export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <p>© {new Date().getFullYear()} FreePlay Arcade — Play classic mini‑games for free.</p>
        <span className="hidden sm:inline">•</span>
        <p className="text-gray-400">Built for fun. No ads. No trackers.</p>
      </div>
    </footer>
  );
}
