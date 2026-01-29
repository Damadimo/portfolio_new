import { Header } from "@/components/header"
import { Projects } from "@/components/projects"
import { DotPattern } from "@/components/ui/dot-pattern"

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      <DotPattern className="fixed inset-0 -z-10 opacity-50 dark:opacity-30" />
      <Header />
      <main className="max-w-[52rem] mx-auto px-8 pt-24 pb-16">
        <Projects />
      </main>
    </div>
  )
}
