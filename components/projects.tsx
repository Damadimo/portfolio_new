import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "AI (RC) Car",
    description: "An autonomous RC car that talks to you and can take you anywhere you want.",
    tech: ["Python", "Hugging Face", "NLP", "esp32"],
    link: "https://github.com/Damadimo/beemerai",
  },
  {
    title: "Website Cloner",
    description: "A Claude-powered tool that clones entire website frontends from just a link.",
    tech: ["TypeScript", "Python", "Claude API", "FastAPI", "Next.js"],
    link: "https://github.com/Damadimo/PixelTwinWebCloner",
  },
  {
    title: "Local LLM Platform",
    description: "Run your own language models on your own hardware - no subscription fees.",
    tech: ["Python", "FastAPI", "PyTorch", "Docker", "Hugging Face"],
    link: "https://github.com/Damadimo/local-llm-api",
  },
  {
    title: "Privacy Advisor Agent",
    description: "Automates privacy rights compliance with regulations like GDPR and CCPA.",
    tech: ["Python", "LangChain", "Vector DB", "Ollama"],
    link: "https://github.com/Damadimo/privacy_advisor_agent",
  },
  {
    title: "Semantic Similarity Engine",
    description: "A semantic similarity search engine built from scratch.",
    tech: ["Python", "NumPy"],
    link: "https://github.com/Damadimo/Semantic-Similarity-Engine",
  },
]

export function Projects() {
  return (
    <section id="work" className="py-12 border-t border-border scroll-mt-20">
      <h2 className="text-xl font-bold text-foreground mb-8">
        Projects
      </h2>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="group p-4 -mx-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/50">
            <div className="flex items-center gap-2 mb-1">
              {project.link ? (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-foreground hover:underline underline-offset-2 inline-flex items-center gap-1.5"
                >
                  {project.title}
                  <ArrowUpRight className="h-5 w-5 opacity-50" />
                </Link>
              ) : (
                <span className="text-xl font-semibold text-foreground">{project.title}</span>
              )}
            </div>
            <p className="text-muted-foreground text-lg mb-2.5">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-sm text-muted-foreground bg-secondary rounded-md"
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
