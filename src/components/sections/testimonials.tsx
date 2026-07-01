// src/components/sections/testimonials.tsx
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TESTIMONIALS } from "@/data/testimonials"
import { SectionHeading } from "@/components/ui/section-heading"
import { easeEditorial } from "@/lib/animation-variants"

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(id)
  }, [paused])

  const current = TESTIMONIALS[index]

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-4xl px-6 py-28 text-center md:px-10 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionHeading eyebrow="Word of Mouth" title="From the Chair" align="center" />

      <div className="relative mt-16 flex h-48 items-center justify-center md:h-40">
        <AnimatePresence mode="wait">
          <motion.figure
            key={current.author}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: easeEditorial }}
          >
            <blockquote className="font-display text-2xl italic leading-snug md:text-4xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 font-sans text-xs uppercase tracking-[0.3em] text-muted">
              {current.author}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.author}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? "bg-foreground" : "bg-border"}`}
          />
        ))}
      </div>
    </section>
  )
}
