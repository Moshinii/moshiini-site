import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"
import { PlusIcon } from "lucide-react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("neo-card neo-card-hover px-5 sm:px-6", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 cursor-pointer items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold text-balance outline-none",
          className
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border-[3px] border-night-soft bg-primary shadow-[2px_2px_0_var(--color-night-soft)] transition-transform duration-150 group-aria-expanded/accordion-trigger:rotate-45"
        >
          <PlusIcon className="size-5" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) border-t-[3px] border-dashed border-night-soft/25 pt-4 pb-5 leading-relaxed text-muted-foreground data-ending-style:h-0 data-starting-style:h-0 [&_a]:font-semibold [&_a]:text-night-soft [&_a]:underline [&_a]:underline-offset-3",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
