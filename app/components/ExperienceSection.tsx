export function ExperienceSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-4xl font-bold text-white">EXPERIENCE</h2>
      <div className="space-y-4">
        {/* Senior Web Developer */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
          <h3 className="text-xl font-bold text-white mb-1">Senior Web Developer</h3>
          <p className="text-zinc-500 text-sm mb-3">PixelPerfect Studios · Portland, OR</p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Lead developer for complex web apps for both startups and clients.
            Focusing on user-friendly design, streamlined functionality, and responsive layouts,
            ensuring scalability and optimal performance with clean code and optimizations.
          </p>
        </div>

        {/* Lead UX/UI Designer */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
          <h3 className="text-xl font-bold text-white mb-1">Lead UX/UI Designer</h3>
          <p className="text-zinc-500 text-sm mb-3">BrightWave Media · Remote</p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Designed user-centered websites and apps for startups.
            Used feedback to create intuitive, attractive products, collaborating with developers
            to add micro-animations and smooth features to boost engagement.
          </p>
        </div>

        {/* Front-End Developer */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
          <h3 className="text-xl font-bold text-white mb-1">Front-End Developer</h3>
          <p className="text-zinc-500 text-sm mb-3">NexWave Digital · San Francisco, CA</p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Built dynamic, accessible websites using HTML, CSS, JavaScript, and React.
            Worked to ensure they worked smoothly on all devices. Worked with designers to turn
            wireframes and mockups into functional, responsive code, and used frameworks to speed up development.
          </p>
        </div>
      </div>
    </section>
  );
}
