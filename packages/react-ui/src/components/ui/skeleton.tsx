import { cn } from "@react-ui/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rt-animate-pulse rt-rounded-md rt-bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
