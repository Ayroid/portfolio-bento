'use client';

export function GitHubActivity() {
  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg">GitHub Activity</h3>
        <a
          href="https://github.com/ramxcodes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-white transition-colors text-xs"
        >
          View Profile →
        </a>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <div className="flex-1">
            <p className="text-zinc-400 text-sm">1,000+ contributions this year</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="flex-1">
            <p className="text-zinc-400 text-sm">Active open source contributor</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <div className="flex-1">
            <p className="text-zinc-400 text-sm">Maintaining multiple projects</p>
          </div>
        </div>
      </div>

      {/* Contribution Graph Placeholder */}
      <div className="mt-6 bg-zinc-900 rounded-lg p-4 border border-zinc-800">
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 84 }).map((_, i) => {
            const intensity = Math.floor(Math.random() * 5);
            const colors = ['bg-zinc-800', 'bg-green-900', 'bg-green-700', 'bg-green-600', 'bg-green-500'];
            return (
              <div
                key={i}
                className={`h-3 rounded-sm ${colors[intensity]}`}
                title={`${intensity} contributions`}
              ></div>
            );
          })}
        </div>
        <p className="text-zinc-600 text-xs mt-2">Contribution activity over the last year</p>
      </div>
    </div>
  );
}
