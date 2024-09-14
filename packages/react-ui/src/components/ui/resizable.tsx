"use client";

import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@react-ui/lib/utils";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn(
        "rt-flex rt-h-full rt-w-full data-[panel-group-direction=vertical]:rt-flex-col",
        className
      )}
      {...props}
    />
  );
}

const ResizablePanel = ResizablePrimitive.Panel;

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        "rt-relative rt-flex rt-w-px rt-items-center rt-justify-center rt-bg-border after:rt-absolute after:rt-inset-y-0 after:rt-left-1/2 afterrt-:w-1 after:-rt-translate-x-1/2 focus-visible:rt-outline-none focus-visible:rt-ring-1 focus-visible:rt-ring-ring focus-visible:rt-ring-offset-1 data-[panel-group-direction=vertical]:rt-h-px data-[panel-group-direction=vertical]:rt-w-full data-[panel-group-direction=vertical]:after:rt-left-0 data-[panel-group-direction=vertical]:after:rt-h-1 data-[panel-group-direction=vertical]:after:rt-w-full data-[panel-group-direction=vertical]:after:-rt-translate-y-1/2 data-[panel-group-direction=vertical]:after:rt-translate-x-0 [&[data-panel-group-direction=vertical]>div]:rt-rotate-90",
        className
      )}
      {...props}
    >
      {withHandle ? (
        <div className="rt-z-10 rt-flex rt-h-4 rt-w-3 rt-items-center rt-justify-center rt-rounded-sm rt-border rt-bg-border">
          <DragHandleDots2Icon className="rt-h-2.5 rt-w-2.5" />
        </div>
      ) : null}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
