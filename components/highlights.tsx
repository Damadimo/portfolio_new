import Link from "next/link"

export const highlights = [
  {
    text: "an (almost) sentient",
    bold: "ai car",
    suffix: "that talks to you, and can drive around by itself",
    link: "https://github.com/damadimo/beemerai",
    icon: "car",
    iconColor: "#d4807a", // soft coral
  },
  {
    text: "a claude-powered",
    bold: "website cloner",
    suffix: "",
    link: "https://github.com/damadimo/PixelTwinWebCloner",
    icon: "copy",
    iconColor: "#a882c4", // soft purple
  },
  {
    text: "a",
    bold: "local llm-platform",
    suffix: "to run open-source models on your own hardware",
    link: "https://github.com/damadimo/local-llm-api",
    icon: "server",
    iconColor: "#6a9fb5", // soft teal
  },
  {
    text: "a ",
    bold: "privacy advisor agent",
    suffix: "that automates compliance (ex: GDPR, CCPA)",
    link: "https://github.com/damadimo/privacy_advisor_agent",
    icon: "shield",
    iconColor: "#7cb38a", // soft green
  },
  {
    text: "a",
    bold: "semantic similarity engine",
    suffix: "from scratch",
    link: "https://github.com/damadimo/Semantic-Similarity-Engine",
    icon: "search",
    iconColor: "#d4a656", // soft gold
  },
]

export function Highlights() {
  return (
    <section className="py-10 border-t border-border">
      <h2 className="text-sm font-medium text-muted-foreground mb-4">
        some things i've done:
      </h2>
      <ul className="space-y-2.5">
        {highlights.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-foreground py-2 px-3 -mx-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/50 hover:shadow-sm">
            <span className="text-muted-foreground select-none">◆</span>
            <span>
              {item.text}{" "}
              {item.link ? (
                <Link href={item.link} className="font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">
                  {item.bold}
                </Link>
              ) : (
                <span className="font-semibold">{item.bold}</span>
              )}{" "}
              {item.suffix}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
