'use client';

export function Header() {
  return (
    <header className="w-full py-6 px-8">
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-white">
        <div className="text-xl font-bold text-white italic">
          BENTO<span className="font-normal">PORTFOLIO</span>
        </div>
        <div className="flex gap-8">
          <a href="#about" className="text-zinc-400 hover:text-white transition-colors">
            ABOUT
          </a>
          <a href="#work" className="text-zinc-400 hover:text-white transition-colors">
            WORK
          </a>
          <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">
            CONTACT
          </a>
        </div>
      </nav>
    </header>
  );
}
