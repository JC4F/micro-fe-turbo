import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Separator,
  TooltipProvider,
  cn,
} from "@repo/react-ui";
import { HeartHandshake } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Nav } from "./nav";
import { Outlet, useLocation } from "react-router-dom";
import { SpinnerWrapper } from "@/components/shared/loading";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/components/error";
import { ReactIcon } from "@/components/icon/react";
import { VueIcon } from "@/components/icon/vue";
import { AngularIcon } from "@/components/icon/angular";
import { useClientRect } from "@/hooks";

const defaultLayout = [16, 84];
const navCollapsedSize = 3;

export const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const resizePanelRef = useRef<any>();
  const [rect, ref] = useClientRect();

  useEffect(() => {
    if (rect?.width && rect.width < 1000) {
      if (!isCollapsed) resizePanelRef.current.collapse();
    } else {
      if (isCollapsed) resizePanelRef.current.expand();
    }
  }, [rect?.width]);

  return (
    <main className="rt-w-full rt-h-full" ref={ref}>
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          className="rt-w-full rt-h-full rt-items-stretch rt-bg-background"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={12}
            maxSize={16}
            onCollapse={() => {
              setIsCollapsed(true);
            }}
            onResize={() => {
              setIsCollapsed(false);
            }}
            className={cn(
              isCollapsed
                ? "rt-min-w-[50px] rt-transition-all rt-duration-300 rt-ease-in-out"
                : "rt-min-w-[250px]"
            )}
            ref={resizePanelRef}
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
                  icon: ReactIcon,
                  href: "/",
                },
                {
                  title: "Vue",
                  label: "",
                  icon: VueIcon,
                  href: "/vue",
                },
                {
                  title: "Angular",
                  label: "",
                  icon: AngularIcon,
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
    </main>
  );
};
