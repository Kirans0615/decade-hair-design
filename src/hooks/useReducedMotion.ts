import { useEffect, useState } from "react"

export function useReducedMotion(): boolean {
  // Initialize synchronously so the first render already knows the user's
  // preference — consumers gate mount-time behavior (e.g. the load-in
  // overlay) on this value, and a false first frame strands them.
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches)
    query.addEventListener("change", listener)
    return () => query.removeEventListener("change", listener)
  }, [])

  return reduced
}
