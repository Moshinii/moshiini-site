import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import type * as React from "react"

const cardVariants = cva("neo-card text-card-foreground", {
  variants: {
    tone: {
      white: "bg-white",
      night: "bg-night text-white",
      paper: "bg-paper",
      mint: "bg-primary",
      amber: "bg-accent",
      lilac: "bg-[#a78bfa]",
    },
    hoverable: {
      true: "neo-card-hover",
    },
  },
  defaultVariants: { tone: "white" },
})

function Card({
  className,
  tone,
  hoverable,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ tone, hoverable, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-display text-xl leading-snug font-semibold text-balance",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("p-6 pt-0", className)} {...props} />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
