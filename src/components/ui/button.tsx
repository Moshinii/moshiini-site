import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/btn inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-[3px] border-night-soft font-display font-semibold whitespace-nowrap select-none transition-[transform,box-shadow,background-color,color] duration-150 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
        white:
          "bg-white text-night-soft shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
        night:
          "bg-night text-white shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-night-soft hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
        blurple:
          "border-night-soft bg-[#5865f2] text-white shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#4752c4] hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
        amber:
          "bg-accent text-accent-foreground shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
        lilac:
          "bg-[#a78bfa] text-night-soft shadow-[5px_5px_0_var(--color-night-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--color-night-soft)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-night-soft)]",
        ghost: "border-transparent bg-transparent text-night-soft hover:bg-white/60",
      },
      size: {
        default: "h-11 px-5 text-base",
        sm: "h-9 px-4 text-sm",
        lg: "h-13 px-6 text-lg sm:h-14 sm:px-8",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
