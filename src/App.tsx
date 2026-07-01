import { useEffect, useState } from "react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { useLenis } from "@/hooks/useLenis"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { DHDLogo } from "@/components/ui/dhd-logo"
import { Cursor } from "@/components/ui/cursor"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { GrainOverlay } from "@/components/ui/grain-overlay"
import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Services } from "@/components/sections/services"
import { Gallery } from "@/components/sections/gallery"
import { Products } from "@/components/sections/products"
import { Atmosphere } from "@/components/sections/atmosphere"
import { Testimonials } from "@/components/sections/testimonials"
import { BookingCta } from "@/components/sections/booking-cta"
import { Footer } from "@/components/sections/footer"

export default function App() {
  useLenis()
  const reduced = useReducedMotion()
  const [loading, setLoading] = useState(!reduced)

  useEffect(() => {
    if (reduced) return
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [reduced])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            <DHDLogo size="md" />
          </motion.div>
        )}
      </AnimatePresence>

      <Cursor />
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Products />
        <Atmosphere />
        <Testimonials />
        <BookingCta />
        <Footer />
      </main>
    </MotionConfig>
  )
}
