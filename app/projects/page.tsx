import { Header } from "@/components/header"
import { Projects } from "@/components/projects"
export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="max-w-[52rem] mx-auto px-8 pt-24 pb-16">
        <Projects />
      </main>
    </div>
  )
}
