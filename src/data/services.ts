export interface Service {
  title: string
  description: string
  price: string
}

export const SERVICES: Service[] = [
  {
    title: "Precision Cutting",
    description: "Sculpted, editorial cuts built around your face and your life.",
    price: "from $85",
  },
  {
    title: "Color & Balayage",
    description: "Hand-painted color — soft grow-out blondes to deep tonal richness.",
    price: "from $150",
  },
  {
    title: "Silk Press & Styling",
    description: "Smooth, glass-finish styling engineered to hold and move.",
    price: "from $95",
  },
  {
    title: "Restorative Treatments",
    description: "Bond-repair and deep conditioning for hair that's been through it.",
    price: "from $65",
  },
]
