import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-8 pb-12">
      <h1 className="text-3xl md:text-[2.75rem] tracking-tight text-foreground mb-4 leading-[1.15]">
        helloooo0ooo im<span className="font-bold italic ml-4">Adam</span>
      </h1>
      <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
        i'm an ece student @{" "}
        <Link href="https://www.engineering.utoronto.ca" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-0.5 font-bold text-foreground">
          <Image src="/Utoronto_coa.svg" alt="UofT" width={20} height={20} className="inline-block" />
          UofT
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
        </Link>{" "}, currently doing ml research @{" "}
        <Link href="https://www.mit.edu" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-baseline">
          <Image src="/mit_job_logo.png" alt="MIT" width={44} height={22} className="inline-block translate-y-0.5" />
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
        </Link>
      </p>

      {/* Highlights Section */}
      <div className="mb-12 space-y-3 text-xl leading-snug">
        {/* What I've been building */}
        <div className="space-y-1">
          <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
            <span className="text-muted-foreground select-none mt-0.5">◆</span>
            <span className="italic font-bold text-muted-foreground">what i've been building:</span>
          </div>
          <div className="ml-6 space-y-1">
            <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
              <span className="text-muted-foreground select-none mt-0.5">↳</span>
              <span>
                shipped a tool that got{" "}
                <span className="group relative inline-block font-bold cursor-default">
                  500+ users
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
                </span>{" "}
                at uoft in the first week
              </span>
            </div>
            <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
              <span className="text-muted-foreground select-none mt-0.5">↳</span>
              <span>
                won{" "}
                <span className="group relative inline-block font-bold cursor-default">
                  $5K
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
                </span>{" "}
                at a hackathon for a project on distributed task scheduling
              </span>
            </div>
            <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
              <span className="text-muted-foreground select-none mt-0.5">↳</span>
              <span>
                contributed perf improvements to{" "}
                <Link href="#" className="group relative inline-block font-bold">
                  open source project
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
                </Link>{" "}
                (40% faster cold starts)
              </span>
            </div>
          </div>
        </div>

        {/* Previously */}
        <div className="space-y-1">
          <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
            <span className="text-muted-foreground select-none mt-0.5">◆</span>
            <span className="italic font-bold text-muted-foreground">previously:</span>
          </div>
          <div className="ml-6 space-y-1">
            <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
              <span className="text-muted-foreground select-none mt-0.5">↳</span>
              <span>
                interned at{" "}
                <Link href="#" className="group relative inline-block font-bold">
                  Company
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
                </Link>{" "}
                working on backend infra
              </span>
            </div>
            <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
              <span className="text-muted-foreground select-none mt-0.5">↳</span>
              <span>
                research @{" "}
                <Link href="https://www.engineering.utoronto.ca" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-0.5">
                  <Image src="/Utoronto_coa.svg" alt="UofT" width={22} height={22} className="inline-block" />
                  <span className="font-bold">UofT ML Lab</span>
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Buttons */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground text-base font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Checkout what I've built
          </Link>
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-1.5 text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            Learn more about me
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-[calc(100%-1.5rem)] bg-current/20" />
            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-[calc(100%-1.5rem)]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
