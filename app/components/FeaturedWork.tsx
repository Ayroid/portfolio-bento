export function FeaturedWork() {
  const projects = [
    { title: 'Kitsilano Real Estate' },
    { title: 'iPhone 16 Product Showcase' },
    { title: 'Framer Components' },
  ];

  return (
    <section id="work" className="space-y-6">
      <h2 className="text-4xl font-bold text-white italic">FEATURED WORK</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-700 transition-colors cursor-pointer group"
          >
            <div className="aspect-4/3 bg-zinc-800 flex items-center justify-center">
              <span className="text-zinc-600 text-sm">Project Image</span>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold group-hover:text-zinc-300 transition-colors">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
