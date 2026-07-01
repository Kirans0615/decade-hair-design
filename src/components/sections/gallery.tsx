import { useState } from "react"
import { motion } from "framer-motion"
import { ASSETS } from "@/lib/assets"
import { SectionHeading } from "@/components/ui/section-heading"
import { Lightbox } from "./lightbox"
import { staggerContainer, scaleIn } from "@/lib/animation-variants"

const SPANS = ["md:row-span-2", "", "", "md:row-span-2", "", ""]

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading eyebrow="Portfolio" title="Recent Work" />

      <motion.div
        className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 md:[grid-auto-rows:220px]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {ASSETS.gallery.map((src, i) => (
          <motion.button
            key={src}
            variants={scaleIn}
            className={`group relative overflow-hidden rounded-sm ${SPANS[i] ?? ""}`}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open gallery image ${i + 1}`}
          >
            <img
              src={src}
              loading="lazy"
              alt={`DHD styling result ${i + 1}`}
              className="h-full w-full scale-100 object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/10" />
          </motion.button>
        ))}
      </motion.div>

      <Lightbox
        images={ASSETS.gallery}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  )
}
