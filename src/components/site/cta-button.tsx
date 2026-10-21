import { ArrowRightIcon } from "lucide-react"
import type { ReactNode } from "react"
import { ButtonLink } from "@/components/ui/button"
import type { BtnSize, BtnVariant } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CtaButtonProps = {
  href?: string
  to?: string
  children: ReactNode
  variant?: BtnVariant
  size?: BtnSize
  className?: string
  external?: boolean
}

/** CTA primário: círculo branco com seta que desliza +3px no hover. */
export function CtaButton({
  href,
  to,
  children,
  variant = "default",
  size = "lg",
  className,
  external = true,
}: CtaButtonProps) {
  return (
    <ButtonLink
      href={href}
      to={to}
      external={external}
      variant={variant}
      size={size}
      className={cn("pl-6 sm:pl-8", className)}
    >
      {children}
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-full border-[3px] border-night-soft bg-white text-night-soft transition-transform duration-150 group-hover/btn:translate-x-[3px] sm:size-9"
      >
        <ArrowRightIcon className="size-4" />
      </span>
    </ButtonLink>
  )
}
