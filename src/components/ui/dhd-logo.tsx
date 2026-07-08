import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { letterContainer, letterChild, underlineDraw, fadeUp } from "@/lib/animation-variants"

const SIZES = {
  sm: { mark: "text-2xl", crest: "h-3.5 w-3.5", sub: "text-[10px]", gap: "gap-1" },
  md: { mark: "text-4xl", crest: "h-5 w-5", sub: "text-xs", gap: "gap-1.5" },
  lg: { mark: "text-7xl md:text-9xl", crest: "h-8 w-8 md:h-10 md:w-10", sub: "text-base md:text-lg", gap: "gap-2 md:gap-3" },
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
    <div className={cn("inline-flex flex-col items-center text-foreground", s.gap, className)}>
      <motion.div
        className="flex items-center gap-2 font-sans font-light uppercase tracking-[0.35em]"
        variants={fadeUp}
        initial={animate ? "hidden" : "show"}
        animate="show"
      >
        <span className={cn(s.sub)}>by Nat Lewis</span>
        <span className="h-3 w-px bg-foreground/40" />
        <FleurDeLis className={cn(s.crest, "opacity-90")} />
      </motion.div>

      <div className="flex w-full flex-col gap-[3px]">
        <motion.div
          className="h-px w-full origin-left bg-foreground/70"
          variants={underlineDraw}
          initial={animate ? "hidden" : "show"}
          animate="show"
        />
        <motion.div
          className="h-px w-full origin-left bg-foreground/70"
          variants={underlineDraw}
          initial={animate ? "hidden" : "show"}
          animate="show"
        />
      </div>

      <motion.div
        className={cn("flex gap-x-[0.12em] font-wordmark font-medium leading-none", s.mark)}
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
    </div>
  )
}

function FleurDeLis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M12 1.2c1.9 1.7 2.4 4.1 1.2 6.4-.5.9-1.2 1.6-1.2 1.6s-.7-.7-1.2-1.6C9.6 5.3 10.1 2.9 12 1.2Z" />
      <path d="M12.9 8.4c.4-2.9 2.7-4.6 5.6-4.3 1.7.2 3 1.1 3 1.1s-.6 1.5-1.8 2.5c-2 1.7-4.6 1.8-6.8.7Z" />
      <path d="M11.1 8.4c-.4-2.9-2.7-4.6-5.6-4.3-1.7.2-3 1.1-3 1.1s.6 1.5 1.8 2.5c2 1.7 4.6 1.8 6.8.7Z" />
      <path d="M11.15 8.6h1.7v8.5h-1.7z" />
      <path d="M8.3 13.9h7.4v1.15H8.3z" />
      <path d="M8.3 18.4h7.4v1.15H8.3z" />
      <path d="M12 17.2c-.5 1.1-1.7 1.7-3 1.3-.9-.3-1.5-.9-1.5-.9s.6-.8 1.5-1.1c1.1-.4 2.3 0 3 .7Z" />
      <path d="M12 17.2c.5 1.1 1.7 1.7 3 1.3.9-.3 1.5-.9 1.5-.9s-.6-.8-1.5-1.1c-1.1-.4-2.3 0-3 .7Z" />
    </svg>
  )
}
