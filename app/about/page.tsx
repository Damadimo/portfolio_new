import { Header } from "@/components/header"
import { DotPattern } from "@/components/ui/dot-pattern"
import { SpotifyWidget } from "@/components/spotify-widget"
import Image from "next/image"
import Link from "next/link"

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
          
          {/* Photo + Intro Section */}
          <div className="flex flex-col-reverse md:flex-row gap-8 mb-8">
            {/* Intro Text */}
            <div className="flex-1 space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm an ece student @{" "}
                <Link href="https://www.engineering.utoronto.ca" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-0.5 font-bold text-foreground">
                  <Image src="/Utoronto_coa.svg" alt="UofT" width={20} height={20} className="inline-block" />
                  UofT
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
                </Link>{" "}
                who is super excited about all things ml. Currently, i'm diving deeper into self-supervised and representation learning as a ml researcher @{" "}
                <Link href="https://www.mit.edu" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-baseline">
                  <Image src="/mit_job_logo.png" alt="MIT" width={44} height={22} className="inline-block translate-y-0.5" />
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
                </Link>.
              </p>
              <div className="space-y-1">
                <p className="mb-2">Outside of work, I have quite a few hobbies that I enjoy:</p>
                <div className="ml-2 space-y-1">
                  <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
                    <span className="text-muted-foreground select-none mt-0.5">↳</span>
                    <span><span className="font-bold text-foreground">playing the guitar</span></span>
                  </div>
                  <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
                    <span className="text-muted-foreground select-none mt-0.5">↳</span>
                    <span><span className="font-bold text-foreground">calisthenics</span> (im hardstuck pre-planche)</span>
                  </div>
                  <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
                    <span className="text-muted-foreground select-none mt-0.5">↳</span>
                    <span><span className="font-bold text-foreground">thinkpads</span> (arguably the best laptops ever made)</span>
                  </div>
                  <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
                    <span className="text-muted-foreground select-none mt-0.5">↳</span>
                    <span><span className="font-bold text-foreground">linux customization</span> (arch btw)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg border border-border/50">
                <Image
                  src="/profile.jpeg"
                  alt="Adam"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Music Section */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            I also love checking out new music, take a look at what i'm listening to right now:
          </p>
          <SpotifyWidget />
        </section>
      </main>
    </div>
  )
}
