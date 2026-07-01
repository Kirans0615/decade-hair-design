import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-sans uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground disabled:opacity-40",
  {
    variants: {
      variant: {
        solid: "bg-foreground text-background hover:bg-foreground/85",
        outline: "border border-foreground/50 text-foreground hover:border-foreground",
        ghost: "text-foreground hover:text-muted",
      },
      size: {
        default: "px-7 py-3 text-xs",
        lg: "px-10 py-4 text-sm",
      },
    },
    defaultVariants: { variant: "solid", size: "default" },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
)
Button.displayName = "Button"
