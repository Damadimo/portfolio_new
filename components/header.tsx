"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { Github, Linkedin, Mail, Palette } from "lucide-react"

const themes = [
  { id: "light", label: "Light", color: "#e8dcc8" },
  { id: "dark", label: "Dark", color: "#2e2e2e" },
  { id: "nord", label: "Nord", color: "#3b4252" },
  { id: "rose", label: "Rosé", color: "#4a2040" },
  { id: "emerald", label: "Emerald", color: "#1a3a2a" },
]

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const themeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full bg-background/70 backdrop-blur-md border border-foreground/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_8px_32px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_32px_-8px_rgba(0,0,0,0.5)]">
        <Link
          href="/"
          className={`group relative text-base font-medium whitespace-nowrap ${isActive("/") ? "text-foreground" : "text-muted-foreground hover:text-foreground"} transition-colors`}
        >
          <span className="sm:hidden">adam</span>
          <span className="hidden sm:inline">adam ab</span>
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
          <span className={`absolute left-0 -bottom-0.5 h-[1.5px] bg-current transition-all duration-[420ms] ease-out ${isActive("/") ? "w-full" : "w-0 group-hover:w-full"}`} />
        </Link>
        <nav className="flex items-center gap-3 sm:gap-4 md:gap-5">
          <Link
            href="/projects"
            className={`group relative text-[0.95rem] ${isActive("/projects") ? "text-foreground" : "text-muted-foreground hover:text-foreground"} transition-colors`}
          >
            projects
            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
            <span className={`absolute left-0 -bottom-0.5 h-[1.5px] bg-current transition-all duration-[420ms] ease-out ${isActive("/projects") ? "w-full" : "w-0 group-hover:w-full"}`} />
          </Link>
          <Link
            href="/about"
            className={`group relative text-[0.95rem] whitespace-nowrap ${isActive("/about") ? "text-foreground" : "text-muted-foreground hover:text-foreground"} transition-colors`}
          >
            <span className="sm:hidden">about</span>
            <span className="hidden sm:inline">about me</span>
            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current/20" />
            <span className={`absolute left-0 -bottom-0.5 h-[1.5px] bg-current transition-all duration-[420ms] ease-out ${isActive("/about") ? "w-full" : "w-0 group-hover:w-full"}`} />
          </Link>
          <div className="w-px h-5 bg-foreground/10" />
          <a
            href="https://github.com/damadimo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/adabdal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </a>
          <a
            href="https://x.com/yabadba"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="X"
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="mailto:adam1.abdalla@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-[18px] w-[18px]" />
          </a>
          <div ref={themeRef} className="relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Change theme"
            >
              <Palette className="h-[18px] w-[18px]" />
            </button>
            {mounted && themeOpen && (
              <div className="absolute right-0 top-full mt-3 p-2 rounded-xl bg-background/90 backdrop-blur-md border border-border shadow-lg min-w-[140px]">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setThemeOpen(false) }}
                    className={`flex items-center gap-2.5 w-full px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      theme === t.id
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full shrink-0 border border-foreground/10"
                      style={{ backgroundColor: t.color }}
                    />
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
