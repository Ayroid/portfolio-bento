'use client';

export function Technologies() {
  const technologies = [
    { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Go'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Three.js'] },
    { category: 'Backend', items: ['Bun', 'Node.js', 'PostgreSQL'] },
    { category: 'Tools', items: ['Figma', 'Vercel', 'AWS', 'Postman', 'Git'] }
  ];

  return (
    <div className="p-6 h-full">
      <h2 className="text-xl font-bold text-white mb-4">Technologies & Tools</h2>
      <div className="space-y-4">
        {technologies.map((tech) => (
          <div key={tech.category}>
            <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider">{tech.category}</p>
            <div className="flex flex-wrap gap-2">
              {tech.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 bg-zinc-900 text-zinc-400 rounded-lg text-sm border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
