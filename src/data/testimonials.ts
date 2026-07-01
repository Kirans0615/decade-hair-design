// src/data/testimonials.ts
export interface Testimonial {
  quote: string
  author: string
}

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Nat doesn't just cut hair — she reads it.", author: "R. Monroe" },
  { quote: "Every visit feels like a reset. I walk out looking like the best version of myself.", author: "A. Whitfield" },
  { quote: "The most precise silk press I've ever had. Bar none.", author: "J. Carrington" },
]
