import { Header } from "@/components/header"
import { DotPattern } from "@/components/ui/dot-pattern"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <DotPattern className="fixed inset-0 -z-10 opacity-50 dark:opacity-30" />
      <Header />
      <main className="max-w-[52rem] mx-auto px-8 pt-24 pb-16">
        <section className="pt-8">
          <h1 className="text-3xl md:text-[2.75rem] font-bold tracking-tight text-foreground mb-8 leading-[1.15]">
            About Me
          </h1>
          <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
            <p>
              Hey! I'm Adam, an Electrical and Computer Engineering student at the University of Toronto. 
              I'm passionate about machine learning, distributed systems, and building tools that people actually use.
            </p>
            <p>
              Currently, I'm diving deeper into self-supervised and representation learning as a ML researcher at MIT. 
              I love working on projects that sit at the intersection of research and practical applications.
            </p>
            <p>
              When I'm not coding, you can find me exploring new music, contributing to open source, 
              or competing in hackathons.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
