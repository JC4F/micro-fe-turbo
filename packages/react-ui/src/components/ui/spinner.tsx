import { Loader } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@react-ui/lib/utils";

const spinnerVariants = cva("rt-text-muted-foreground rt-animate-spin", {
  variants: {
    size: {
      default: "rt-h-4 rt-w-4",
      sm: "rt-h-2 rt-w-2",
      lg: "rt-h-6 rt-w-6",
      icon: "rt-h-10 rt-w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type SpinnerProps = VariantProps<typeof spinnerVariants>;

export function Spinner({ size }: SpinnerProps) {
  return <Loader className={cn(spinnerVariants({ size }))} />;
}
