import { ASSETS } from "@/lib/assets"

export interface Product {
  name: string
  line: string
  size: string
  description: string
  image: string
}

export interface ProductGroup {
  title: string
  products: Product[]
}

export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    title: "Cleanse",
    products: [
      {
        name: "DHD H2O",
        line: "Moisturizing Shampoo",
        size: "8 fl oz / 32 fl oz",
        description: "A gentle, hydrating cleanse built with cucumber and melon.",
        image: ASSETS.products.h2o,
      },
      {
        name: "DHD Clean",
        line: "Deep Cleansing Shampoo",
        size: "8 fl oz / 32 fl oz",
        description: "Tea tree oil clarifies the scalp for a fresh, anti-itch reset.",
        image: ASSETS.products.clean,
      },
    ],
  },
  {
    title: "Condition",
    products: [
      {
        name: "DHD Moisture",
        line: "Deep Penetrating Conditioner",
        size: "8 fl oz / 32 fl oz",
        description: "Cucumber and melon work deep into the strand for lasting softness.",
        image: ASSETS.products.moisture,
      },
      {
        name: "DHD Relief",
        line: "Anti-Itch Conditioner",
        size: "8 fl oz / 32 fl oz",
        description: "An invigorating, deep-conditioning follow-up to DHD Clean.",
        image: ASSETS.products.reliefConditioner,
      },
    ],
  },
  {
    title: "Style & Finish",
    products: [
      {
        name: "DHD Smooth",
        line: "Defining Pomade",
        size: "3.5 oz / 100 ml",
        description: "A light-hold pomade for sculpted, defined finishes.",
        image: ASSETS.products.smooth,
      },
      {
        name: "DHD Relief",
        line: "Invigorating Pomade",
        size: "4 fl oz",
        description: "Camphor and botanicals soothe the scalp while it styles.",
        image: ASSETS.products.reliefPomade,
      },
      {
        name: "DHD Foam",
        line: "Sculpting Setting Lotion",
        size: "7 fl oz / 207 ml",
        description: "A light foam that sets a style without weighing it down.",
        image: ASSETS.products.foam,
      },
      {
        name: "DHD Shine",
        line: "Spray Laminate",
        size: "4 fl oz / 118 ml",
        description: "A fine mist that seals in shine and smooths the cuticle.",
        image: ASSETS.products.shine,
      },
      {
        name: "DHD Control",
        line: "Holding Mist",
        size: "8 fl oz",
        description: "Flexible hold that locks a style in place all day.",
        image: ASSETS.products.controlMist,
      },
      {
        name: "DHD Control",
        line: "Edge Rejuvenator",
        size: "travel tin",
        description: "Lays edges down clean with a soothing, non-flaking finish.",
        image: ASSETS.products.controlEdge,
      },
      {
        name: "DHD Silk Energizer",
        line: "For Soft, Silky Hair",
        size: "2 fl oz",
        description: "A few drops smooth and energize hair between services.",
        image: ASSETS.products.silkEnergizer,
      },
    ],
  },
]
