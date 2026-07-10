import { motion } from "framer-motion"
import { ASSETS } from "@/lib/assets"
import { PRODUCT_GROUPS } from "@/data/products"
import { SectionHeading } from "@/components/ui/section-heading"
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animation-variants"

export function Products() {
  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading eyebrow="DHD by Nat Lewis" title="The House Line" />

      <motion.div
        className="mt-14 overflow-hidden rounded-sm"
        variants={scaleIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <img
          src={ASSETS.products.lineup}
          alt="The full DHD by Nat Lewis product line"
          loading="lazy"
          className="w-full object-cover"
        />
      </motion.div>

      {PRODUCT_GROUPS.map((group) => (
        <div key={group.title} className="mt-20 first:mt-20">
          <h3 className="font-display text-2xl italic md:text-3xl">{group.title}</h3>

          <motion.div
            className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {group.products.map((product) => (
              <motion.div key={`${product.name}-${product.line}`} variants={fadeUp} className="group">
                <div className="overflow-hidden rounded-sm bg-black/20">
                  <img
                    src={product.image}
                    alt={`${product.name} ${product.line}`}
                    loading="lazy"
                    className="h-[320px] w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h4 className="font-label text-lg font-medium">{product.name}</h4>
                  <span className="shrink-0 font-sans text-[11px] uppercase tracking-[0.25em] text-muted">
                    {product.size}
                  </span>
                </div>
                <p className="mt-1 font-sans text-sm text-muted">{product.line}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed">{product.description}</p>
                <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.3em] text-muted">
                  Available in-salon
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  )
}
