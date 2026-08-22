export const siteConfig = {
  name: "Ayush Singh Kushwah",
  username: "ayroid",
  title: "Ayroid",
  description: "Software Engineer",
  email: "ayushsk.work@gmail.com",
  resumeUrl: "/resume",
  resumePdf: "/resume.pdf",
  calendarUrl: "https://cal.com/ayroid/general-meeting",
  url: "https://ayroid.in",
} as const;

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "https://thoughts.ayroid.in", label: "Thoughts" },
] as const;

export type NavLink = (typeof navLinks)[number];
