import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Signature } from "@/components/signature"
export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="max-w-[52rem] mx-auto px-8 pt-24 pb-16">
        <Hero />
        <Experience />
        <Signature />
      </main>
    </div>
  )
}
