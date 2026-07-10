import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { DHDLogo } from "@/components/ui/dhd-logo"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { staggerContainer, fadeUp } from "@/lib/animation-variants"

const LINKS = [
  { href: "#about", label: "Studio" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#products", label: "Products" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" aria-label="Decade Hair Design home">
            <DHDLogo size="sm" animate={false} compact />
          </a>
          <nav className="hidden gap-8 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-xs uppercase tracking-[0.3em] text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <MagneticButton size="default" variant="outline">
              Book Now
            </MagneticButton>
          </div>
          <button
            aria-label="Open menu"
            className="text-foreground lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <DHDLogo size="sm" animate={false} compact />
              <button aria-label="Close menu" className="text-foreground" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <motion.nav
              className="flex flex-1 flex-col items-center justify-center gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  variants={fadeUp}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl italic text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
