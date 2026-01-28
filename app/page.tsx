import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Highlights } from "@/components/highlights"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-16">
        <Hero />
        <Highlights />
        <Projects />
        <Experience />
      </main>
    </>
  )
}
