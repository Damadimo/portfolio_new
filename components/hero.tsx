import Link from "next/link"
import { SpotifyWidget } from "./spotify-widget"

export function Hero() {
  return (
    <section className="pt-8 pb-12">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
        hey, i'm <span className="italic">Adam</span> -
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-6">
        ece student at uoft. i like building things that work and breaking things to see why they don't. super interested in applied ml right now
      </p>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="#work"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity"
          >
            see my projects
          </Link>
          <Link
            href="#experience"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            experience
          </Link>
        </div>
        
        <SpotifyWidget />
      </div>
    </section>
  )
}
