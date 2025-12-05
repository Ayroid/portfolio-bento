'use client';

export function ExperienceSection() {
  const experiences = [
    {
      title: 'Founding Frontend Engineer',
      company: 'good day :3',
      location: 'United States (Remote)',
      period: 'August 2025 - Present',
      description: 'Architecting frontend infrastructure for promotional campaign management, leading codebase refactoring initiatives, optimizing API integrations, and implementing design systems with accessibility standards.',
      technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'React', 'Figma', 'Vercel', 'AWS', 'Postman', 'Bun']
    },
    {
      title: 'Backend Developer Intern',
      company: 'Upsurge Labs',
      location: 'Bangalore, India',
      period: 'June - July 2025',
      description: 'Contributed to backend development and API integration projects.',
      technologies: ['Node.js', 'PostgreSQL', 'REST APIs']
    },
    {
      title: 'Founding Engineer',
      company: 'Prepeasy',
      location: 'Remote',
      period: 'April - June 2025',
      description: 'Built core features and architecture for the educational platform.',
      technologies: ['React', 'Next.js', 'TypeScript']
    },
    {
      title: 'SDE-1 (Full Stack) Intern',
      company: 'Expelee',
      location: 'Dubai, UAE',
      period: 'August 2023 - April 2025',
      description: 'Developed full-stack features and maintained production applications.',
      technologies: ['React', 'Node.js', 'MongoDB']
    }
  ];

  return (
    <div className="p-6 sm:p-8 h-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-zinc-800 pl-4 pb-6 last:pb-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-white font-bold text-lg">{exp.title}</h3>
                <p className="text-zinc-400 text-sm">{exp.company}</p>
              </div>
              <span className="text-zinc-600 text-xs whitespace-nowrap ml-2">{exp.period}</span>
            </div>
            <p className="text-zinc-500 text-xs mb-3">{exp.location}</p>
            <p className="text-zinc-500 text-sm mb-3 leading-relaxed">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
