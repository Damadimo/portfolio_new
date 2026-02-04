"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
