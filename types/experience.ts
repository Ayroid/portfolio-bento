export interface Experience {
  title: string;
  company: string;
  logo: string;
  companyUrl?: string;
  location: string;
  period: string;
  socials?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  technologies: string[];
  description: string[];
}
