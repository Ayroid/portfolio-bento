'use client';

export function BlogsSection() {
  const blogs = [
    {
      title: 'Go in Me',
      excerpt: 'Exploring the world of Go programming and building scalable backend services with modern practices.',
      date: 'Dec 2025',
      readTime: '5 min read',
      tags: ['Go', 'Backend', 'Programming']
    },
    {
      title: 'My Winter Arc',
      excerpt: 'Reflections on personal development, coding journey, and building meaningful projects during winter season.',
      date: 'Nov 2025',
      readTime: '3 min read',
      tags: ['Personal', 'Development', 'Growth']
    }
  ];

  return (
    <div className="p-6 sm:p-8 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Blogs</h2>
        <a
          href="https://medium.com/@ramxcodes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-white transition-colors text-sm"
        >
          View All →
        </a>
      </div>

      <div className="space-y-4">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white font-bold text-lg group-hover:text-zinc-300 transition-colors">
                {blog.title}
              </h3>
              <span className="text-zinc-600 text-xs whitespace-nowrap ml-2">{blog.date}</span>
            </div>
            <p className="text-zinc-500 text-sm mb-3 leading-relaxed">
              {blog.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-zinc-600 text-xs">{blog.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
