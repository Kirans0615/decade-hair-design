import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { letterContainer, letterChild } from "@/lib/animation-variants"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ eyebrow, title, align = "left", className }: SectionHeadingProps) {
  const words = title.split(" ")

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="mb-4 font-sans text-xs uppercase tracking-[0.4em] text-muted">{eyebrow}</p>
      )}
      <motion.h2
        className={cn(
          "flex flex-wrap gap-x-4 font-display text-4xl font-light italic leading-[1.05] md:text-6xl",
          align === "center" && "justify-center"
        )}
        variants={letterContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {words.map((word, i) => (
          <motion.span key={`${word}-${i}`} variants={letterChild} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  )
}
