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
    <section id="work" className="py-10 border-t border-border scroll-mt-20">
      <h2 className="text-sm font-medium text-muted-foreground mb-6">
        things i've built:
      </h2>

      <div className="space-y-5">
        {projects.map((project, index) => (
          <div key={index} className="group">
            <div className="flex items-center gap-2 mb-1">
              {project.link ? (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:underline underline-offset-2 inline-flex items-center gap-1"
                >
                  {project.title}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                </Link>
              ) : (
                <span className="font-medium text-foreground">{project.title}</span>
              )}
            </div>
            <p className="text-muted-foreground text-sm mb-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs text-muted-foreground bg-secondary rounded"
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
