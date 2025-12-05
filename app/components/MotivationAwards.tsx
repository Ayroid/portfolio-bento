export function MotivationAwards() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Motivation */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
        <h2 className="text-3xl font-bold text-white mb-4">MOTIVATION</h2>
        <p className="text-zinc-400 leading-relaxed mb-6">
          Driven by a passion for innovative design and a commitment to delivering high-quality work,
          I find motivation in the challenges each project presents. Every pixel, every interaction,
          every piece of code tells a story, and I am fueled by the opportunity to craft digital
          experiences that not only captivate but also solve real-world problems. For me, it's about
          pushing boundaries, exploring new techniques, and continuously evolving to stay ahead in an
          ever-changing digital landscape. Each project is a chance to inspire, engage, and make a
          lasting impact.
        </p>
        <p className="text-white italic font-['Brush_Script_MT',cursive] text-2xl">
          Wayne Harkwood
        </p>
      </div>

      {/* Awards */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
        <h2 className="text-3xl font-bold text-white mb-6">AWARDS</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-1">Awwwards - Site Of The Day</h3>
            <p className="text-zinc-400 text-sm">
              Recognized for outstanding creativity, design, and user experience for a cutting-edge
              website that pushes the boundaries of what's possible in digital design.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Webby Awards - Best Portfolio</h3>
            <p className="text-zinc-400 text-sm">
              Awarded for innovation and exceptional design in crafting a personal portfolio website
              that combines both technical skill and aesthetic vision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
