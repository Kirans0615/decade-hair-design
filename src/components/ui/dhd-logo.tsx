import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { letterContainer, letterChild, underlineDraw } from "@/lib/animation-variants"

const SIZES = {
  sm: { mark: "text-lg", crest: "h-4 w-4", sub: "text-[9px]" },
  md: { mark: "text-3xl", crest: "h-6 w-6", sub: "text-[11px]" },
  lg: { mark: "text-6xl md:text-8xl", crest: "h-10 w-10 md:h-14 md:w-14", sub: "text-sm md:text-base" },
} as const

interface DHDLogoProps {
  size?: keyof typeof SIZES
  animate?: boolean
  className?: string
}

const LETTERS = ["D", "H", "D"]

export function DHDLogo({ size = "md", animate = true, className }: DHDLogoProps) {
  const s = SIZES[size]

  return (
    <div className={cn("inline-flex flex-col items-center gap-1 text-foreground", className)}>
      <FleurDeLis className={cn(s.crest, "opacity-90")} />
      <motion.div
        className={cn("flex font-display font-light tracking-[0.25em]", s.mark)}
        variants={letterContainer}
        initial={animate ? "hidden" : "show"}
        animate="show"
      >
        {LETTERS.map((letter, i) => (
          <motion.span key={`${letter}-${i}`} variants={letterChild}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className="h-px w-full origin-left bg-foreground/70"
        variants={underlineDraw}
        initial={animate ? "hidden" : "show"}
        animate="show"
      />
      <span className={cn("font-sans font-light uppercase tracking-[0.4em] text-muted", s.sub)}>
        Hair Design
      </span>
    </div>
  )
}

function FleurDeLis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.75} className={className}>
      <path d="M12 2c1.5 2 1.5 4.5 0 6.5C10.5 6.5 10.5 4 12 2Z" />
      <path d="M12 8.5c2.5-3 6-2.5 7 0-1.5 2.5-4.5 3-7 0Z" />
      <path d="M12 8.5c-2.5-3-6-2.5-7 0 1.5 2.5 4.5 3 7 0Z" />
      <path d="M12 8.5v9M9 15h6M9 20h6" />
      <path d="M12 17.5c-1 1-2.5 1-3-.3M12 17.5c1 1 2.5 1 3-.3" />
    </svg>
  )
}
