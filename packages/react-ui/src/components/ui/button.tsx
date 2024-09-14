import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@react-ui/lib/utils";

const buttonVariants = cva(
  "rt-inline-flex rt-items-center rt-justify-center rt-whitespace-nowrap rt-rounded-md rt-text-sm rt-font-medium rt-transition-colors focus-visible:rt-outline-none focus-visible:rt-ring-1 focus-visible:rt-ring-ring disabled:rt-pointer-events-none disabled:rt-opacity-50",
  {
    variants: {
      variant: {
        default:
          "rt-bg-primary rt-text-primary-foreground rt-shadow hover:rt-bg-primary/90",
        destructive:
          "rt-bg-destructive rt-text-destructive-foreground rt-shadow-sm hover:rt-bg-destructive/90",
        outline:
          "rt-border rt-border-input rt-bg-background rt-shadow-sm hover:rt-bg-accent hover:rt-text-accent-foreground",
        secondary:
          "rt-bg-secondary rt-text-secondary-foreground rt-shadow-sm hover:rt-bg-secondary/80",
        ghost: "hover:rt-bg-accent hover:rt-text-accent-foreground",
        link: "rt-text-primary rt-underline-offset-4 hover:rt-underline",
      },
      size: {
        default: "rt-h-9 rt-px-4 rt-py-2",
        sm: "rt-h-8 rt-rounded-md rt-px-3 rt-text-xs",
        lg: "rt-h-10 rt-rounded-md rt-px-8",
        icon: "rt-h-9 rt-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
