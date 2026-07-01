import { motion } from "framer-motion"
import { useMagneticCursor } from "@/hooks/useMagneticCursor"
import { Button, type ButtonProps } from "./button"

export function MagneticButton(props: ButtonProps) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticCursor<HTMLButtonElement>(0.3)

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={onMouseMove as any}
      onMouseLeave={onMouseLeave as any}
      className="inline-block"
    >
      <Button ref={ref} {...props} />
    </motion.div>
  )
}
