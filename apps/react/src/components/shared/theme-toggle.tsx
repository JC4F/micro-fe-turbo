import { ActionTooltip, Button, cn } from "@repo/react-ui";
import { useGeneralStore } from "@repo/util";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ isCollapsed = true }: { isCollapsed: boolean }) {
  const { theme, setTheme } = useGeneralStore();

  return (
    <ActionTooltip label={theme === "dark" ? "Light" : "Dark"} theme="dark">
      <Button
        variant="secondary"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={cn(
          "rt-w-[calc(100%-16px)] !rt-p-0",
          isCollapsed && "rt-flex rt-items-center"
        )}
      >
        {theme === "dark" && <Sun className="rt-size-5" />}
        {theme === "light" && <Moon className="rt-size-5" />}
        {!isCollapsed && <span className="rt-ml-2">Change Mode</span>}
      </Button>
    </ActionTooltip>
  );
}
