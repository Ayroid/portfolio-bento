'use client';

export function BioSection() {
  return (
    <div className="p-6 sm:p-8 h-full flex items-center">
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-6xl overflow-hidden shrink-0">
          🐶
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-3">Ramkrishna Swarnkar</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Full Stack Web Developer & Open Source Contributor passionate about building interactive web apps
            with emphasis on UI design. Specialized in creating MVPs that solve real-world problems.
            Enthusiastic about Three.js and modern web technologies.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://github.com/ramxcodes"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              @ramxcodes
            </a>
            <span className="text-zinc-700">•</span>
            <a
              href="mailto:ramxcodes@gmail.com"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              ramxcodes@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
