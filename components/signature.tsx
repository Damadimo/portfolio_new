"use client"

import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Signature() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="pt-8 pb-16 border-t border-border">
      {/* Desktop: Signature + Icons */}
      <div className="hidden md:flex items-center gap-4">
        <Image
          src={mounted && resolvedTheme === "dark" 
            ? "/portfolio_signature-removebg-preview.png" 
            : "/portfolio_signature_brown.png"}
          alt="Signature"
          width={550}
          height={220}
          className={mounted && resolvedTheme === "dark" ? "invert" : ""}
        />
        <div className="flex items-center gap-6 -translate-x-10 -translate-y-1">
          <a
            href="https://www.linkedin.com/in/adabdal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-y-0.5"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-8 w-8" />
          </a>
          <a
            href="https://github.com/damadimo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-y-0.5"
            aria-label="GitHub"
          >
            <Github className="h-8 w-8" />
          </a>
          <a
            href="https://x.com/yabadba"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-y-0.5"
            aria-label="X"
          >
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="mailto:adam1.abdalla@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-y-0.5"
            aria-label="Email"
          >
            <Mail className="h-8 w-8" />
          </a>
        </div>
      </div>

      {/* Mobile: Icons only, centered */}
      <div className="flex md:hidden items-center justify-center gap-8">
        <a
          href="https://www.linkedin.com/in/adabdal/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-y-0.5"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-7 w-7" />
        </a>
        <a
          href="https://github.com/damadimo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-y-0.5"
          aria-label="GitHub"
        >
          <Github className="h-7 w-7" />
        </a>
        <a
          href="https://x.com/yabadba"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-y-0.5"
          aria-label="X"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href="mailto:adam1.abdalla@gmail.com"
          className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-y-0.5"
          aria-label="Email"
        >
          <Mail className="h-7 w-7" />
        </a>
      </div>
    </section>
  )
}
