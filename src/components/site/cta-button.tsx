import { ArrowRightIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"

type CtaButtonProps = {
  href: string
  children: ReactNode
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
  className?: string
  external?: boolean
}

/** CTA primário: círculo branco com seta que desliza +3px no hover. */
export function CtaButton({
  href,
  children,
  variant = "default",
  size = "lg",
  className,
  external = true,
}: CtaButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("pl-6 sm:pl-8", className)}
      render={
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        />
      }
    >
      {children}
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-full border-[3px] border-night-soft bg-white text-night-soft transition-transform duration-150 group-hover/btn:translate-x-[3px] sm:size-9"
      >
        <ArrowRightIcon className="size-4" />
      </span>
    </Button>
  )
}
