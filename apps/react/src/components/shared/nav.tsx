import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  buttonVariants,
  cn,
} from "@repo/react-ui";

import { Link, useLocation } from "react-router-dom";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: (...arg: any) => JSX.Element;
    href: string;
  }[];
}

export const Nav = ({ links, isCollapsed }: NavProps) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      data-collapsed={isCollapsed}
      className="group rt-flex rt-flex-col rt-justify-between rt-items-center rt-gap-4 rt-py-2 data-[collapsed=true]:rt-py-2 rt-h-[calc(100%-53px)] rt-w-full"
    >
      <nav className="rt-w-full rt-grid rt-gap-1 rt-px-2 group-[[data-collapsed=true]]:rt-justify-center group-[[data-collapsed=true]]:rt-px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={link.href}
                  className={cn(
                    buttonVariants({
                      variant: pathname === link.href ? "default" : "ghost",
                      size: "icon",
                    }),
                    "rt-size-9",
                    pathname === link.href &&
                      "dark:rt-bg-muted dark:rt-text-muted-foreground dark:hover:rt-bg-muted dark:hover:rt-text-white"
                  )}
                >
                  <link.icon
                    className={cn(
                      "rt-size-5 rt-fill-muted-foreground",
                      pathname === link.href && "!rt-fill-muted"
                    )}
                  />
                  <span className="rt-sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="rt-flex rt-items-center rt-gap-4"
              >
                {link.title}
                <span className="rt-ml-auto rt-text-muted-foreground">
                  {link.label}
                </span>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to={link.href}
              className={cn(
                buttonVariants({
                  variant: pathname === link.href ? "default" : "ghost",
                  size: "default",
                }),
                pathname === link.href &&
                  "dark:rt-bg-muted dark:rt-text-white dark:hover:rt-bg-muted dark:hover:rt-text-white",
                "rt-justify-start"
              )}
            >
              <link.icon
                className={cn(
                  "rt-mr-2 rt-size-5 rt-fill-muted-foreground",
                  pathname === link.href && "!rt-fill-muted"
                )}
              />
              {link.title}
              <span
                className={cn(
                  "rt-ml-auto",
                  pathname === link.href &&
                    "rt-text-background dark:rt-text-white"
                )}
              >
                {link.label}
              </span>
            </Link>
          )
        )}
      </nav>

      <ThemeToggle />
    </div>
  );
};
