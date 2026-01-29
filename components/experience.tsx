import Image from "next/image"

const experiences = [
  {
    company: "MIT",
    role: "Applied ML Researcher",
    location: "Cambridge, MA",
    startDate: "Jan 2025",
    endDate: "Present",
    description: "PyTorch pipelines, geospatial infilling, ResNet-U-Net models.",
    logo: "/mit_job_logo.png",
  },
  {
    company: "Data Passports",
    role: "Software Engineer (Applied ML)",
    location: "Toronto, ON",
    startDate: "May 2025",
    endDate: "Sept 2025",
    description: "LLM agents, RAG pipelines, Docker/Azure deployment, GDPR compliance.",
    logo: "/datapassports_logo.png",
  },
  {
    company: "FI Solutions",
    role: "Software Engineering Intern",
    location: "Toronto, ON",
    startDate: "Apr 2025",
    endDate: "Sept 2025",
    description: "Next.js data platform, REST APIs, enterprise audit automation.",
    logo: "/fi-logo.png",
  },
  {
    company: "UofT Robotics Association",
    role: "Software Engineering Intern",
    location: "Toronto, ON",
    startDate: "Sept 2024",
    endDate: "May 2025",
    description: "Autonomous robotics, YOLOv5 fine-tuning, ROS containerization.",
    logo: "/Utoronto_coa.svg",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-12 border-t border-border scroll-mt-20">
      <h2 className="text-xl font-bold text-foreground mb-4">
        Experience
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
