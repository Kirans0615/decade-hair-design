import { useRef } from "react"
import { useMotionValue, useSpring } from "framer-motion"
import { useReducedMotion } from "./useReducedMotion"

export function useMagneticCursor<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 200, damping: 15, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 200, damping: 15, mass: 0.4 })

  function onMouseMove(e: React.MouseEvent<T>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left - rect.width / 2) * strength)
    rawY.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return { ref, x, y, onMouseMove, onMouseLeave }
}
