import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Divider({ className, animated = true }: { className?: string; animated?: boolean }) {
  return (
    <motion.div
      className={cn("h-px w-full origin-left bg-border", className)}
      initial={animated ? { scaleX: 0 } : undefined}
      whileInView={animated ? { scaleX: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
    />
  )
}
