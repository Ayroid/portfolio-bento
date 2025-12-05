'use client';

export function HeroSection() {
  return (
    <div className="p-6 sm:p-8 h-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden shrink-0">
            <span className="text-3xl">🐶</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Hi, I'm Ram — A Full Stack web developer.
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              I'm a Full Stack web developer and Open Source Contributor, I love building products to solve real-world problems. I'm specialized in building MVP's.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://drive.google.com/file/d/1example"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <span>📄</span>
            <span>Resume</span>
          </a>
          <a
            href="https://linkedin.com/in/ramxcodes"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <span>💼</span>
            <span>LinkedIn</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {[
            { icon: '🐦', url: 'https://twitter.com/ramxcodes', label: 'Twitter' },
            { icon: '📧', url: 'mailto:ramxcodes@gmail.com', label: 'Email' },
            { icon: '💻', url: 'https://github.com/ramxcodes', label: 'GitHub' },
            { icon: '📺', url: 'https://youtube.com/@ramxcodes', label: 'YouTube' },
            { icon: '📷', url: 'https://instagram.com/ramxcodes', label: 'Instagram' },
            { icon: '📌', url: 'https://pinterest.com/ramxcodes', label: 'Pinterest' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
              aria-label={social.label}
            >
              <span className="text-lg">{social.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
