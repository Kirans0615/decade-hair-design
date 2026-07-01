import { useEffect } from "react"
import Lenis from "lenis"
import { useReducedMotion } from "./useReducedMotion"

export function useLenis() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [reduced])
}
