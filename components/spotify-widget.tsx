"use client"

import { useState, useEffect } from "react"

const PLAYLIST_TRACKS = [
  { name: "Redbone", artist: "Childish Gambino" },
  { name: "Nights", artist: "Frank Ocean" },
  { name: "Ivy", artist: "Frank Ocean" },
  { name: "Pink + White", artist: "Frank Ocean" },
  { name: "Self Control", artist: "Frank Ocean" },
  { name: "4r Da Squaw", artist: "Isaiah Rashad" },
  { name: "Heavenly Father", artist: "Isaiah Rashad" },
  { name: "Shot You Down", artist: "Isaiah Rashad" },
  { name: "West Savannah", artist: "Isaiah Rashad" },
  { name: "Solange", artist: "Isaiah Rashad" },
]

export function SpotifyWidget() {
  const [currentTrack, setCurrentTrack] = useState(PLAYLIST_TRACKS[0])
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        const randomIndex = Math.floor(Math.random() * PLAYLIST_TRACKS.length)
        setCurrentTrack(PLAYLIST_TRACKS[randomIndex])
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const shuffle = () => {
    const randomIndex = Math.floor(Math.random() * PLAYLIST_TRACKS.length)
    setCurrentTrack(PLAYLIST_TRACKS[randomIndex])
  }

  return (
    <button
      onClick={shuffle}
      className="group flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded bg-[#1DB954]">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-sm text-foreground truncate">{currentTrack.name}</p>
        <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
      </div>
      <svg 
        viewBox="0 0 24 24" 
        className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors ml-auto shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
      </svg>
    </button>
  )
}
