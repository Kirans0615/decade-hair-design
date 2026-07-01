import { motion } from "framer-motion"
import { Marquee } from "@/components/ui/marquee"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { fadeUp } from "@/lib/animation-variants"

export function BookingCta() {
  return (
    <section className="border-y border-border bg-background py-28 md:py-36">
      <Marquee items={["Cut", "Color", "Style", "Treat", "Repeat"]} className="mb-16" />

      <motion.div
        className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <h2 className="font-display text-4xl italic leading-tight md:text-6xl">
          Your next look starts here.
        </h2>
        <p className="mt-6 max-w-md font-sans text-base text-muted">
          Limited chair availability — book your appointment with Nat Lewis today.
        </p>
        <div className="mt-10">
          <MagneticButton size="lg" variant="solid">
            Book Now
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  )
}
