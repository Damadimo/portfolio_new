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
      <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-background/50 backdrop-blur-2xl border border-foreground/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_8px_32px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_32px_-8px_rgba(0,0,0,0.5)]">
        <Link
          href="/"
          className="font-medium text-foreground hover:opacity-70 transition-opacity"
        >
          Adam Ab
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="#work"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            projects
          </Link>
          <Link
            href="#experience"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            experience
          </Link>
          <div className="w-px h-4 bg-foreground/10" />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:you@mail.utoronto.ca"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
