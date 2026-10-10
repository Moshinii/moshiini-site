import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-full border-[3px] border-night-soft px-3 py-1 font-display text-xs font-semibold whitespace-nowrap text-night-soft shadow-[2px_2px_0_var(--color-night-soft)] select-none [&>svg]:pointer-events-none [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        default: "bg-white",
        mint: "bg-primary",
        amber: "bg-accent",
        lilac: "bg-[#a78bfa]",
        rose: "bg-[#ff8ab5]",
        blurple: "bg-[#5865f2] text-white",
        night: "bg-night text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
