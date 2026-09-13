import Link from "next/link";
import { Mail } from "lucide-react";
import { navLinks, siteConfig, socialProfiles } from "@/config";

const quiet = "transition-colors hover:text-neutral-100";

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-8 text-[13px] text-neutral-500">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {socialProfiles.map(({ platform, url, icon: Icon }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform}
              className={quiet}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className={quiet}
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link href={siteConfig.resumeUrl} className={quiet}>
            Resume
          </Link>
          <a
            href={siteConfig.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={quiet}
          >
            Book a call
          </a>
        </div>
      </div>

      <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} className={quiet}>
            {l.label}
          </Link>
        ))}
      </nav>

      <p className="mt-6 text-neutral-600">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
};

export default Footer;
