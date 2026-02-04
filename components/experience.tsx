import Image from "next/image"

const experiences = [
  {
    company: "MIT",
    role: "Machine Learning Researcher",
    location: "Cambridge, MA",
    startDate: "Jan 2025",
    endDate: "Present",
    description: "Self-supervised geospatial learning from sparse Positive Unlabeled data.",
    logo: "/mit-logo.png",
  },
  {
    company: "Data Passports",
    role: "Software & Applied ML Engineer",
    location: "Toronto, ON",
    startDate: "May 2025",
    endDate: "Sept 2025",
    description: "Building Agents that automate privacy rights compliance.",
    logo: "/datapassports_logo.png",
  },
  {
    company: "FI Solutions",
    role: "Software Engineer",
    location: "Toronto, ON",
    startDate: "Apr 2025",
    endDate: "Sept 2025",
    description: "Back-end dev for enterprise audit automation.",
    logo: "/fi-logo.png",
  },
  {
    company: "UofT Robotics Association",
    role: "Software Engineer",
    location: "Toronto, ON",
    startDate: "Sept 2024",
    endDate: "May 2025",
    description: "Building autonomous soccer-playing robots!",
    logo: "/Utoronto_coa.svg",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-12 border-t border-border scroll-mt-20">
      <h2 className="text-xl font-bold text-foreground mb-4">
        My work experience
      </h2>
      
      <div className="space-y-2">
        {experiences.map((exp, index) => (
          <div key={index} className="group flex gap-5 p-4 -mx-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/50">
            {/* Logo */}
            <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src={exp.logo}
                alt={exp.company}
                width={64}
                height={64}
                className="object-contain w-full h-full"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-foreground leading-tight">
                {exp.role}
              </h3>
              <p className="text-lg text-muted-foreground mt-0.5">
                {exp.company} · {exp.startDate} - {exp.endDate} | {exp.location}
              </p>
              <p className="text-lg text-muted-foreground mt-1">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
