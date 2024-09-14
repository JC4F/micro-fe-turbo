"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "@react-ui/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    className={cn(
      "rt-z-50 rt-overflow-hidden rt-rounded-md rt-g-primary rt-px-3 rt-py-1.5 rt-text-xs rt-text-primary-foreground rt-bg-foreground rt-animate-in rt-fade-in-0 rt-zoom-in-95 data-[state=closed]:rt-animate-out data-[state=closed]:rt-fade-out-0 data-[state=closed]:rt-zoom-out-95 data-[side=bottom]:rt-slide-in-from-top-2 data-[side=left]:rt-slide-in-from-right-2 data-[side=right]:rt-slide-in-from-left-2 data-[side=top]:rt-slide-in-from-bottom-2",
      className
    )}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
