import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxProps {
  images: readonly string[]
  openIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ images, openIndex, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    if (openIndex === null) return

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNavigate(((openIndex ?? 0) + 1) % images.length)
      if (e.key === "ArrowLeft") onNavigate(((openIndex ?? 0) - 1 + images.length) % images.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [openIndex, images.length, onClose, onNavigate])

  return (
    <AnimatePresence>
      {openIndex !== null && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button aria-label="Close lightbox" className="absolute right-6 top-6 text-foreground" onClick={onClose}>
            <X className="h-7 w-7" />
          </button>
          <button
            aria-label="Previous image"
            className="absolute left-4 text-foreground md:left-10"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((openIndex - 1 + images.length) % images.length)
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <motion.img
            key={openIndex}
            src={images[openIndex]}
            alt="DHD gallery selection"
            className="max-h-[85vh] max-w-[85vw] object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Next image"
            className="absolute right-4 text-foreground md:right-10"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((openIndex + 1) % images.length)
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
