"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react"

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-8 px-8 py-3.5 rounded-full bg-background/70 backdrop-blur-md border border-foreground/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_8px_32px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_32px_-8px_rgba(0,0,0,0.5)]">
        <Link
          href="/"
          className="group relative text-base font-medium text-foreground whitespace-nowrap"
        >
          <span className="sm:hidden">adam</span>
          <span className="hidden sm:inline">adam ab</span>
          <span className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-foreground/20" />
          <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-foreground transition-all duration-[420ms] ease-out group-hover:w-full" />
        </Link>
        <nav className="flex items-center gap-5">
          <Link
            href="#work"
            className="group relative text-[0.95rem] text-muted-foreground hover:text-foreground transition-colors"
          >
            projects
            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
          </Link>
          <Link
            href="#experience"
            className="group relative text-[0.95rem] text-muted-foreground hover:text-foreground transition-colors"
          >
            experience
            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-current transition-all duration-[420ms] ease-out group-hover:w-full" />
          </Link>
          <div className="w-px h-5 bg-foreground/10" />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </a>
          <a
            href="mailto:you@mail.utoronto.ca"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-[18px] w-[18px]" />
          </a>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
