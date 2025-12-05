export function HeroSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left: Name and Description */}
      <div className="space-y-6">
        <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
          WAYNE<br />HARKWOOD
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Hey, I'm Wayne Harkwood, a web designer and developer from Portland with bold ideas.
          I love creating digital experiences that are always focused on great user experiences. I'm
          also into 3D graphics and interactive design.
          Let's work together to build something cool and engaging.
        </p>
      </div>

      {/* Right: Profile Photo */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-md aspect-square bg-zinc-800 border border-zinc-700 rounded-sm overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-zinc-600">
            {/* Placeholder for profile photo */}
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <p className="text-zinc-500 text-sm italic">Wanna get in touch?</p>
        <button className="flex items-center gap-2 text-white hover:text-zinc-300 transition-colors group">
          <span className="font-semibold">EMAIL ME</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
