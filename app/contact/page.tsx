import { Header } from "@/components/header"
import { DotPattern } from "@/components/ui/dot-pattern"
import { Mail, Github, Linkedin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <DotPattern className="fixed inset-0 -z-10 opacity-50 dark:opacity-30" />
      <Header />
      <main className="max-w-[52rem] mx-auto px-8 pt-24 pb-16">
        <section className="pt-8">
          <h1 className="text-3xl md:text-[2.75rem] font-bold tracking-tight text-foreground mb-8 leading-[1.15]">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            I'm always open to new opportunities, collaborations, or just a friendly chat. 
            Feel free to reach out through any of the channels below.
          </p>
          
          <div className="space-y-6">
            <a
              href="mailto:you@mail.utoronto.ca"
              className="group flex items-center gap-4 p-4 -mx-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/50"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Email</p>
                <p className="text-base text-muted-foreground">you@mail.utoronto.ca</p>
              </div>
            </a>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 -mx-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/50"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">GitHub</p>
                <p className="text-base text-muted-foreground">@yourusername</p>
              </div>
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 -mx-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/50"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">LinkedIn</p>
                <p className="text-base text-muted-foreground">Adam Abdalla</p>
              </div>
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
