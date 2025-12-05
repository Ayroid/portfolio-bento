'use client';

export function SetupSection() {
  const setup = [
    {
      category: 'Wears Used',
      item: 'Glasses, Watch, Airpods Max',
      icon: '👓'
    },
    {
      category: 'VSCode / Cursor Setup',
      item: 'One Dark Pro theme with custom extensions',
      icon: '💻'
    }
  ];

  return (
    <div className="p-6 h-full">
      <h2 className="text-xl font-bold text-white mb-4">Setup</h2>
      <div className="space-y-4">
        {setup.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm mb-1">{item.category}</h3>
                <p className="text-zinc-500 text-sm">{item.item}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
