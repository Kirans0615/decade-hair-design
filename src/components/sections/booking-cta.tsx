import { motion } from "framer-motion"
import { Marquee } from "@/components/ui/marquee"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { SectionHeading } from "@/components/ui/section-heading"
import { fadeUp } from "@/lib/animation-variants"

export function BookingCta() {
  return (
    <section className="border-y border-border bg-background py-28 md:py-36">
      <Marquee items={["Cut", "Color", "Style", "Treat", "Repeat"]} className="mb-16" />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeading eyebrow="Ready?" title="Your next look starts here." align="center" />

        <motion.div
          className="mt-6 flex flex-col items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <p className="max-w-md font-sans text-base text-muted">
            Limited chair availability — book your appointment with Nat Lewis today.
          </p>
          <div className="mt-10">
            <MagneticButton size="lg" variant="solid">
              Book Now
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
