import Image from "next/image"

const experiences = [
  {
    company: "MIT",
    role: "Machine Learning Researcher",
    location: "City",
    period: "2025",
    description: "Backend infrastructure, distributed systems.",
    logo: "/MIT_JOB_logo.png", // Replace with actual logo path
  },
  {
    company: "Research Lab @ UofT",
    role: "Undergraduate Researcher",
    location: "Toronto",
    period: "2024",
    description: "ML systems, model optimization.",
    logo: "/Utoronto_coa.svg",
  },
  {
    company: "Design Team",
    role: "Software Lead",
    location: "Toronto",
    period: "2023",
    description: "Leading a team of 8 on embedded software.",
    logo: "/placeholder-logo.svg", // Replace with actual logo path
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-12 border-t border-border scroll-mt-20">
      <h2 className="text-lg font-bold text-foreground mb-8">
        Experience
      </h2>
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="group flex gap-6 p-4 -mx-4 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-secondary/50 hover:shadow-md">
            {/* Logo */}
            <div className="shrink-0 w-16 h-16 relative">
              <Image
                src={exp.logo}
                alt={exp.company}
                fill
                className="object-contain"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground">
                {exp.company} ({exp.period})
              </h3>
              <p className="text-base text-muted-foreground">
                {exp.role}, {exp.location}
              </p>
              <p className="text-base text-muted-foreground mt-1">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
