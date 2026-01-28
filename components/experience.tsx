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
    <section id="experience" className="py-10 border-t border-border scroll-mt-20">
      <h2 className="text-sm font-medium text-muted-foreground mb-6">
        where i've worked:
      </h2>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="group">
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h3 className="font-medium text-foreground">
                {exp.role}
              </h3>
              <span className="text-sm text-muted-foreground font-mono shrink-0">
                {exp.period}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              {exp.company} — {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
