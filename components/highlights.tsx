import Link from "next/link"

const highlights = [
  {
    text: "shipped a tool that got",
    bold: "500+ users",
    suffix: "at uoft in the first week",
  },
  {
    text: "won",
    bold: "$5K",
    suffix: "at a hackathon for a project on distributed task scheduling",
  },
  {
    text: "interned at",
    bold: "Company",
    suffix: "working on backend infra",
    link: "#",
  },
  {
    text: "contributed perf improvements to",
    bold: "open source project",
    suffix: "(40% faster cold starts)",
    link: "#",
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
          <li key={index} className="flex items-start gap-2 text-foreground">
            <span className="text-muted-foreground select-none">-</span>
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
