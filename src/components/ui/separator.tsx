import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-night-soft/20 data-horizontal:h-[3px] data-horizontal:w-full data-horizontal:rounded-full data-vertical:w-[3px] data-vertical:self-stretch data-vertical:rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
