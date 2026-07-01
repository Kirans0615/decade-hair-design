import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { ASSETS } from "@/lib/assets"
import { DHDLogo } from "@/components/ui/dhd-logo"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { letterContainer, letterChild, fadeUp } from "@/lib/animation-variants"

const HEADLINE = "Hair, Sculpted."

export function Hero() {
  const reduced = useReducedMotion()
  const [videoReady, setVideoReady] = useState(false)
  const words = HEADLINE.split(" ")

  return (
    <section id="top" className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${ASSETS.hero.poster})`, opacity: videoReady ? 0 : 1 }}
      />
      {!reduced && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={ASSETS.hero.video}
          poster={ASSETS.hero.poster}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/35 to-background/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.6)]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <DHDLogo size="lg" />

        <motion.h1
          className="mt-10 flex flex-wrap justify-center gap-x-5 font-display text-5xl font-light italic leading-[1.05] md:text-8xl"
          variants={letterContainer}
          initial="hidden"
          animate="show"
        >
          {words.map((word, i) => (
            <motion.span key={`${word}-${i}`} variants={letterChild} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-md font-sans text-sm uppercase tracking-[0.35em] text-muted md:text-base"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.9 }}
        >
          Editorial cuts &amp; color, by Nat Lewis
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.1 }}
          className="mt-10"
        >
          <MagneticButton size="lg" variant="solid">
            Book Now
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-foreground/70"
        animate={reduced ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  )
}
