import { type VariantProps, cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "vs-inline-flex vs-items-center vs-justify-center vs-whitespace-nowrap vs-rounded-md vs-text-sm vs-font-medium vs-transition-colors focus-visible:vs-outline-none focus-visible:vs-ring-1 focus-visible:vs-ring-ring disabled:vs-pointer-events-none disabled:vs-opacity-50",
  {
    variants: {
      variant: {
        default:
          "vs-bg-primary vs-text-primary-foreground vs-shadow hover:vs-bg-primary/90",
        destructive:
          "vs-bg-destructive vs-text-destructive-foreground vs-shadow-sm hover:vs-bg-destructive/90",
        outline:
          "vs-border vs-border-input vs-bg-background vs-shadow-sm hover:vs-bg-accent hover:vs-text-accent-foreground",
        secondary:
          "vs-bg-secondary vs-text-secondary-foreground vs-shadow-sm hover:vs-bg-secondary/80",
        ghost: "hover:vs-bg-accent hover:vs-text-accent-foreground",
        link: "vs-text-primary vs-underline-offset-4 hover:vs-underline",
      },
      size: {
        default: "vs-h-9 vs-px-4 vs-py-2",
        sm: "vs-h-8 vs-rounded-md vs-px-3 vs-text-xs",
        lg: "vs-h-10 vs-rounded-md vs-px-8",
        icon: "vs-h-9 vs-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
