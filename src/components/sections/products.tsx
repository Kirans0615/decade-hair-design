import { motion } from "framer-motion"
import { ASSETS } from "@/lib/assets"
import { SectionHeading } from "@/components/ui/section-heading"
import { staggerContainer, fadeUp } from "@/lib/animation-variants"

const PRODUCTS = [
  { src: ASSETS.products.tins, name: "DHD Smooth", note: "Signature smoothing balm, house line" },
  { src: ASSETS.products.cape, name: "DHD Studio Cape", note: "The cape every client wears" },
]

export function Products() {
  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading eyebrow="House Line" title="Made for the Craft" />

      <motion.div
        className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {PRODUCTS.map((product) => (
          <motion.div key={product.name} variants={fadeUp} className="group">
            <div className="overflow-hidden rounded-sm">
              <img
                src={product.src}
                alt={product.name}
                loading="lazy"
                className="h-[420px] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
            <h3 className="mt-6 font-display text-2xl italic">{product.name}</h3>
            <p className="mt-1 font-sans text-sm text-muted">{product.note}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
