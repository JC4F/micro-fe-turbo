import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Separator,
  TooltipProvider,
  cn,
} from "@repo/react-ui";
import { File, HeartHandshake, Inbox, Send } from "lucide-react";
import { Suspense, useState } from "react";
import { Nav } from "./nav";
import { Outlet, useLocation } from "react-router-dom";
import { SpinnerWrapper } from "@/components/shared/loading";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/components/error";

const defaultLayout = [16, 84];
const navCollapsedSize = 3;

export const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="rt-w-full rt-h-full rt-items-stretch"
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
              "rt-min-w-[50px] rt-transition-all rt-duration-300 rt-ease-in-out"
          )}
        >
          <div
            className={cn(
              "rt-flex rt-h-[52px] rt-items-center rt-justify-center",
              isCollapsed ? "rt-h-[52px]" : "rt-px-2"
            )}
          >
            <HeartHandshake className="rt-size-5" />
            {!isCollapsed && (
              <span className="rt-ml-1 rt-text-sm">Enjoy it!</span>
            )}
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "React",
                label: "",
                icon: Inbox,
                href: "/",
              },
              {
                title: "Vue",
                label: "",
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
          <ErrorBoundary fallback={<ErrorPage />} key={location.pathname}>
            <Suspense fallback={<SpinnerWrapper />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};
