import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Divider } from "@/components/ui/divider"
import { SERVICES } from "@/data/services"
import { fadeUp, staggerContainer } from "@/lib/animation-variants"

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading eyebrow="What We Do" title="A Considered Menu" />

      <motion.div
        className="mt-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SERVICES.map((service) => (
          <motion.div
            key={service.title}
            variants={fadeUp}
            className="group grid grid-cols-1 items-baseline gap-3 border-b border-border py-8 transition-colors hover:border-foreground/40 md:grid-cols-[1fr_auto_auto] md:gap-8"
          >
            <h3 className="font-display text-2xl italic transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
              {service.title}
            </h3>
            <p className="max-w-sm font-sans text-sm text-muted md:text-base">
              {service.description}
            </p>
            <span className="font-sans text-sm uppercase tracking-[0.2em] text-muted">
              {service.price}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <Divider className="mt-16" />
    </section>
  )
}
