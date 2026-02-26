import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Car, Copy, Server, Shield, Search } from "lucide-react"
import { highlights } from "./highlights"

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  car: Car,
  copy: Copy,
  server: Server,
  shield: Shield,
  search: Search,
}

export function Hero() {
  return (
    <section className="pt-8 pb-12">
      <h1 className="text-3xl md:text-[2.75rem] tracking-tight text-foreground mb-4 leading-[1.15]">
        helloooo0ooo im<span className="font-bold italic ml-4">Adam</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 transition-transform duration-200 hover:-translate-y-0.5">
        i'm an incoming eng intern @{" "}
        <Link href="https://www.shopify.com" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-0.5 font-bold text-foreground">
          <Image src="/shopify-logo-png-transparent.png" alt="Shopify" width={22} height={22} className="inline-block" />
          Shopify
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
        </Link>{" "}and an ML researcher @{" "}
        <Link href="https://www.mit.edu" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-baseline">
          <Image src="/mit-logo.png" alt="MIT" width={44} height={22} className="inline-block translate-y-0.5" />
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
        </Link>. I am also studying ece @{" "}
        <Link href="https://www.engineering.utoronto.ca" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-0.5 font-bold text-foreground">
          <Image src="/Utoronto_coa.svg" alt="UofT" width={20} height={20} className="inline-block" />
          UofT
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
        </Link>{" "}which has been lots of fun!!
      </p>

      {/* Highlights Section */}
      <div className="mb-12 space-y-1 text-base sm:text-lg md:text-xl leading-snug">
        <div className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
          <span className="text-muted-foreground select-none mt-0.5">◆</span>
          <span className="italic font-bold text-muted-foreground">some cool things ive built:</span>
        </div>
        <div className="ml-6 space-y-1">
          {highlights.map((item, index) => {
            const Icon = item.icon ? iconMap[item.icon] : null
            return (
              <div key={index} className="flex items-start gap-3 py-0.5 transition-transform duration-200 hover:-translate-y-0.5">
                <span className="text-muted-foreground select-none mt-0.5">↳</span>
                <span>
                  {item.text}{" "}
                  {item.link ? (
                    <Link href={item.link} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-1.5 font-bold">
                      {item.bold}
                      {Icon && <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 inline-block" style={{ color: item.iconColor }} />}
                      <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
                      <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
                    </Link>
                  ) : (
                    <span className="group relative inline-flex items-center gap-1.5 font-bold cursor-default">
                      {item.bold}
                      {Icon && <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 inline-block" style={{ color: item.iconColor }} />}
                      <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
                      <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
                    </span>
                  )}{" "}
                  {item.suffix}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* CTA Buttons */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground text-base font-medium rounded-lg hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5"
          >
            Check out more stuff i've built
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
