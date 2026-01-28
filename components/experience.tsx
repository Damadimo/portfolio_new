const experiences = [
  {
    company: "Company Name",
    role: "Software Engineering Intern",
    period: "Summer 2025",
    description: "Backend infrastructure, distributed systems.",
  },
  {
    company: "Research Lab @ UofT",
    role: "Undergraduate Researcher",
    period: "2024 - Present",
    description: "ML systems, model optimization.",
  },
  {
    company: "Design Team",
    role: "Software Lead",
    period: "2023 - Present",
    description: "Leading a team of 8 on embedded software.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-12 border-t border-border scroll-mt-20">
      <h2 className="text-base font-medium text-muted-foreground mb-8">
        where i've worked:
      </h2>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="group p-5 -mx-5 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-secondary/50 hover:shadow-md">
            <div className="flex items-baseline justify-between gap-4 mb-1.5">
              <h3 className="text-lg font-medium text-foreground">
                {exp.role}
              </h3>
              <span className="text-base text-muted-foreground font-mono shrink-0">
                {exp.period}
              </span>
            </div>
            <p className="text-muted-foreground text-base">
              {exp.company} — {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
