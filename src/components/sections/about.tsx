import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ASSETS } from "@/lib/assets"
import { SectionHeading } from "@/components/ui/section-heading"
import { Divider } from "@/components/ui/divider"
import { fadeUp } from "@/lib/animation-variants"

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section id="about" ref={ref} className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
        <div className="order-2 overflow-hidden rounded-sm md:order-1">
          <motion.img
            src={ASSETS.about.portrait}
            alt="Nat Lewis with a client at the DHD studio"
            className="h-[520px] w-full object-cover"
            style={{ y }}
          />
        </div>
        <motion.div
          className="order-1 md:order-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <SectionHeading eyebrow="The Studio" title="Precision is a Language" />
          <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-muted md:text-lg">
            Nat Lewis built Decade Hair Design around a simple idea: a haircut is
            architecture. Every line is intentional, every finish is considered,
            and every client leaves looking like a sharper version of themselves.
          </p>
          <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-muted md:text-lg">
            A decade of craft, distilled into a black-and-white studio built for
            focus — no noise, no trends chasing themselves. Just cut, color, and
            finish, done right.
          </p>
          <Divider className="mt-10" />
        </motion.div>
      </div>
    </section>
  )
}
