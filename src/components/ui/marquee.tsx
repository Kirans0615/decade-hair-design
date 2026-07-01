// src/components/ui/marquee.tsx
import { cn } from "@/lib/utils"

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const loop = [...items, ...items]

  return (
    <div className={cn("overflow-hidden border-y border-border py-6", className)}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={i} className="font-display text-3xl italic text-muted md:text-5xl">
            {item} <span className="not-italic text-foreground/30">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
