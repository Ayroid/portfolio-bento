import { socialProfiles } from "@/config/social";

const Connect = () => {
  return (
    <section
      className="group relative flex h-full min-h-32 w-full flex-col p-4 font-mono transition-colors"
      aria-labelledby="connect-heading"
    >
      <div className="flex flex-1 items-end justify-between">
        <h2
          id="connect-heading"
          className="relative text-2xl font-medium text-white transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 sm:text-3xl lg:text-4xl"
        >
          CONNECT
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-px w-0 bg-white/40 transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover:w-full"
          />
        </h2>

        <div className="flex items-center gap-4 pb-1" aria-hidden="true">
          {socialProfiles.map((profile, i) => {
            const Icon = profile.icon;
            return (
              <Icon
                key={profile.platform}
                className="h-5 w-5 text-zinc-400 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:text-white sm:h-6 sm:w-6"
                style={{ transitionDelay: `${i * 45}ms` }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Connect;
