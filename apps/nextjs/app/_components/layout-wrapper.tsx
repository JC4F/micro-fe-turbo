"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Separator,
  TooltipProvider,
  cn,
} from "@repo/react-ui";
import { File, HeartHandshake, Inbox, Send } from "lucide-react";
import { ReactNode, useState } from "react";
import { Nav } from "./nav";

const defaultLayout = [16, 84];
const navCollapsedSize = 3;

export const LayoutWrapper = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={12}
          maxSize={16}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <HeartHandshake className="size-5" />
            {!isCollapsed && <span className="ml-1 text-sm">Enjoy it!</span>}
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "React",
                label: "128",
                icon: Inbox,
                href: "/",
              },
              {
                title: "Vue",
                label: "9",
                icon: File,
                href: "/vue",
              },
              {
                title: "Angular",
                label: "",
                icon: Send,
                href: "/angular",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};
