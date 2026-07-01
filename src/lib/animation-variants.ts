import type { Variants } from "framer-motion"

export const easeEditorial = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeEditorial } },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

export const letterContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
}

export const letterChild: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotate: 4 },
  show: { opacity: 1, y: "0em", rotate: 0, transition: { duration: 0.7, ease: easeEditorial } },
}

export const underlineDraw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.3 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easeEditorial } },
}
