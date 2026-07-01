// src/components/ui/cursor.tsx
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { easeEditorial } from "@/lib/animation-variants"

export function Cursor() {
  const reduced = useReducedMotion()
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 300, damping: 30 })
  const sy = useSpring(y, { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (reduced) return

    function move(e: MouseEvent) {
      x.set(e.clientX - 12)
      y.set(e.clientY - 12)
      const target = e.target as HTMLElement
      setHovering(!!target.closest("a, button, [data-cursor-hover]"))
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-6 w-6 rounded-full border border-foreground mix-blend-difference md:block"
      style={{ x: sx, y: sy }}
      animate={{ scale: hovering ? 2.2 : 1 }}
      transition={{ duration: 0.25, ease: easeEditorial }}
    />
  )
}
