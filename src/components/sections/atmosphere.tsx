import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ASSETS } from "@/lib/assets"
import { SectionHeading } from "@/components/ui/section-heading"
import { fadeUp } from "@/lib/animation-variants"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const yLead = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])
  const ySide = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"])
  const reduced = useReducedMotion()

  return (
    <section id="atmosphere" ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Inside DHD" title="Built for Focus" align="center" />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
          <div className="overflow-hidden rounded-sm md:col-span-2 md:row-span-2">
            <motion.img
              src={ASSETS.atmosphere.booth}
              alt="DHD at a trade show, Nat Lewis backdrop and product display"
              className="h-[340px] w-full object-cover md:h-[600px]"
              style={{ y: reduced ? 0 : yLead }}
            />
          </div>
          <div className="overflow-hidden rounded-sm">
            <motion.img
              src={ASSETS.gallery[2]}
              alt="Studio interior detail, checkered accent wall"
              className="h-[280px] w-full object-cover object-left"
              style={{ y: reduced ? 0 : ySide }}
            />
          </div>
          <div className="overflow-hidden rounded-sm">
            <motion.img
              src={ASSETS.gallery[3]}
              alt="Studio interior detail, natural light and wood floors"
              className="h-[280px] w-full object-cover object-right"
              style={{ y: reduced ? 0 : ySide }}
            />
          </div>
        </div>

        <motion.p
          className="mx-auto mt-16 max-w-2xl text-center font-sans text-base leading-relaxed text-muted md:text-lg"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          Natural light, wood floors, and a black-and-white palette built to
          disappear — so the only thing you notice is the work.
        </motion.p>
      </div>
    </section>
  )
}
