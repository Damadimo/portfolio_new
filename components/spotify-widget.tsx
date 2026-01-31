"use client"

import { useState } from "react"
import Image from "next/image"

interface Album {
  id: string
  name: string
  artist: string
  cover: string
  description: string
  link: string
}

const albums: Album[] = [
  {
    id: "1",
    name: "so good",
    artist: "bunii",
    cover: "/albums/bunii_bastard_cover.jpeg",
    description: "idek how to describe this one",
    link: "https://open.spotify.com/track/0K8AHkp1LpaTRasNVcNGh4?si=df07af96f41949e4",
  },
  {
    id: "2",
    name: "Eve",
    artist: "shy the eternal",
    cover: "/albums/eve_shy_cover.jpeg",
    description: "i am pretty sure this is bunii's alt account",
    link: "https://open.spotify.com/track/7xk1Fl7yPTCZ4DZcqZQ8oN?si=e851e625c4f34502",
  },
  {
    id: "3",
    name: "jit",
    artist: "me",
    cover: "/albums/leo_cover.jpeg",
    description: "an album i made with random songs i like - cover is leo (my cat)",
    link: "https://open.spotify.com/playlist/0JXinC06qYzrZ5T477uNtP?si=kPPocHX3Qpystq975xhnvw"
  },
  {
    id: "4",
    name: "Full Moon Full Life",
    artist: "Persona 3 OST",
    cover: "/albums/p3_cover.jpeg",
    description: "Arguably the best video game soundtrack in history.",
    link: "https://open.spotify.com/track/3Jl2LQmRwbXEF2lO1RTvxn?si=a430618e2d0b4d88"
  },
  {
    id: "5",
    name: "Pokemon",
    artist: "kiheir",
    cover: "/albums/pokemon_cover.jpeg",
    description: "i really like the guitar on this",
    link: "https://open.spotify.com/track/5TCMwai7hIBq2uUjBGDsIU?si=d2b75e16d2f14479"
  },
  {
    id: "6",
    name: "Strangers",
    artist: "proderics",
    cover: "/albums/strangers_cover.jpeg",
    description: "apperently this was recorded on a phone. actually insane",
    link: "https://open.spotify.com/track/20tqXTp7TJRtLA8s2vpgEB?si=d349337e7e984884"
  },
  {
    id: "7",
    name: "UNTITLED",
    artist: "mp3beige",
    cover: "/albums/UNTITLED_mp3_cover.jpeg",
    description: "this album sounds like a Nintendo Wii",
    link: "https://open.spotify.com/album/2i1TYbNGDBOAr8jxOOaRIi?si=7cX00uljSei5hTfyxQBZhw"
  },
  {
    id: "8",
    name: "Whistle",
    artist: "proderics",
    cover: "/albums/whistle_cover.jpeg",
    description: "by the same people that made strangers, they never miss",
    link: "https://open.spotify.com/track/2oGLpRtqXiDlOXjwFQ7ciu?si=c2243dd54a2e4733"
  },
]

export function SpotifyWidget() {
  const [hoveredAlbum, setHoveredAlbum] = useState<Album | null>(null)
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number; y: number } | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate albums for seamless infinite scroll
  const duplicatedAlbums = [...albums, ...albums]

  const handleAlbumHover = (album: Album, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const containerRect = event.currentTarget.closest('.album-strip-container')?.getBoundingClientRect()
    if (containerRect) {
      setHoveredPosition({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top,
      })
    }
    setHoveredAlbum(album)
  }

  return (
    <div className="w-full mt-6">
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1DB954]">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span className="text-sm text-muted-foreground">what i've been listening to</span>
      </div>

      {/* Album Strip Container */}
      <div 
        className="relative rounded-xl bg-secondary/30 border border-border/50 p-4 album-strip-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          setHoveredAlbum(null)
          setHoveredPosition(null)
        }}
      >
        {/* Hover Tooltip - positioned outside overflow container */}
        {hoveredAlbum && hoveredPosition && (
          <div 
            className="absolute z-50 pointer-events-none"
            style={{
              left: hoveredPosition.x,
              top: hoveredPosition.y - 12,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="bg-[#1a1a1a] rounded-lg px-4 py-3 shadow-2xl min-w-[200px] max-w-[260px]">
              <p className="font-semibold text-white text-sm mb-0.5">{hoveredAlbum.name}</p>
              <p className="text-[#a0a0a0] text-xs">
                {hoveredAlbum.artist} · {hoveredAlbum.description}
              </p>
            </div>
          </div>
        )}

        {/* Scrolling Strip */}
        <div className="overflow-hidden">
          <div 
            className={`flex gap-4 ${isPaused ? 'animation-paused' : ''}`}
            style={{
              animation: 'scroll 30s linear infinite',
              width: 'max-content',
            }}
          >
            {duplicatedAlbums.map((album, index) => (
              <div
                key={`${album.id}-${index}`}
                className="relative group"
                onMouseEnter={(e) => handleAlbumHover(album, e)}
                onMouseLeave={() => {
                  setHoveredAlbum(null)
                  setHoveredPosition(null)
                }}
              >
                {/* Album Cover */}
                <a 
                  href={album.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative w-20 h-20 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 group-hover:scale-105 cursor-pointer block"
                >
                  <Image
                    src={album.cover}
                    alt={album.name}
                    fill
                    className="object-cover"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-secondary/30 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}
