'use client';

export function Projects() {
  const projects = [
    {
      title: 'NotesBuddy',
      description: 'Comprehensive study platform featuring notes, flashcards, quizzes, AI chatbot, and interactive learning tools.',
      tags: ['Next.js', 'TypeScript', 'AI', 'Education'],
      gradient: 'from-pink-500 to-purple-500'
    },
    {
      title: 'Appwrite MCP Server',
      description: 'Model Context Protocol implementation with 7 tools and 99.9% success rate for seamless integration.',
      tags: ['TypeScript', 'Appwrite', 'MCP', 'Server'],
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      title: 'Syncify',
      description: 'Real-time music streaming platform with synchronized playback and social features for shared listening experiences.',
      tags: ['React', 'WebSockets', 'Music', 'Real-time'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Pasandida Aurat',
      description: 'Dating platform emphasizing authentic connections and meaningful relationships (in development).',
      tags: ['Next.js', 'Dating', 'Social', 'MVP'],
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <div className="p-6 sm:p-8 h-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-all group cursor-pointer"
          >
            <div className={`h-32 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-zinc-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-500 text-sm mb-3 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
