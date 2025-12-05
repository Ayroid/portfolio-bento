export function ToolboxExpertise() {
  const tools = ['B', 'Ae', 'Id', 'Ai', 'Fr', 'Ps'];

  return (
    <div className="space-y-8">
      {/* Toolbox */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">TOOLBOX</h2>
        <div className="flex gap-6 flex-wrap">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center"
            >
              <span className="text-zinc-500 text-xs">{tool}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expertise */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">EXPERTISE</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
            <div>
              <h3 className="text-white font-semibold mb-1">Web / App Design</h3>
              <p className="text-zinc-400 text-sm">
                Creating user-centered designs that blend functionality and aesthetics.
                I specialize in creating intuitive, visually appealing interfaces that
                enhance user experience and reflect each brand's unique identity.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
            <div>
              <h3 className="text-white font-semibold mb-1">3D Design</h3>
              <p className="text-zinc-400 text-sm">
                Bringing ideas to life with immersive 3D models and visualizations.
                From concept to final renders, I create detailed, realistic 3D content
                that captivates and communicates complex ideas with clarity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Badge */}
      <div className="flex items-center gap-2 text-green-500">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-sm font-medium">AVAILABLE FOR FREELANCE</span>
      </div>
    </div>
  );
}
