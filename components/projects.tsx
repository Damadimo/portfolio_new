import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "project name",
    description: "one-liner about what it does and why it matters.",
    tech: ["TypeScript", "Next.js", "PostgreSQL"],
    link: "https://github.com",
  },
  {
    title: "another project",
    description: "keep it brief. what problem does this solve?",
    tech: ["Python", "FastAPI", "Redis"],
    link: "https://github.com",
  },
  {
    title: "third project",
    description: "maybe something with hardware or embedded systems.",
    tech: ["C++", "Rust", "ARM"],
    link: null,
  },
]

export function Projects() {
  return (
    <section id="work" className="py-12 border-t border-border scroll-mt-20">
      <h2 className="text-base font-medium text-muted-foreground mb-8">
        things i've built:
      </h2>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="group p-5 -mx-5 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-secondary/50 hover:shadow-md">
            <div className="flex items-center gap-2 mb-1.5">
              {project.link ? (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-foreground hover:underline underline-offset-2 inline-flex items-center gap-1"
                >
                  {project.title}
                  <ArrowUpRight className="h-4 w-4 opacity-50" />
                </Link>
              ) : (
                <span className="text-lg font-medium text-foreground">{project.title}</span>
              )}
            </div>
            <p className="text-muted-foreground text-base mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-sm text-muted-foreground bg-secondary rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
