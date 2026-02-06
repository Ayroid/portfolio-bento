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
          className="text-2xl font-medium text-white sm:text-3xl lg:text-4xl"
        >
          CONNECT
        </h2>

        <div className="flex items-center gap-4 pb-1" aria-hidden="true">
          {socialProfiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <Icon
                key={profile.platform}
                className="h-5 w-5 text-white sm:h-6 sm:w-6"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Connect;
