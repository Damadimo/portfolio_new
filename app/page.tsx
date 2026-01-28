import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { DotPattern } from "@/components/ui/dot-pattern"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <DotPattern className="fixed inset-0 -z-10 opacity-50 dark:opacity-30" />
      <Header />
      <main className="max-w-[52rem] mx-auto px-8 pt-24 pb-16">
        <Hero />
        <Experience />
        <Projects />
      </main>
    </div>
  )
}
