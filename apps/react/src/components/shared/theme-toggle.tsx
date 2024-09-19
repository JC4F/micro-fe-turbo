import { ActionTooltip, Button } from "@repo/react-ui";
import { useGeneralStore } from "@repo/util";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useGeneralStore();

  return (
    <ActionTooltip label={theme === "dark" ? "Light" : "Dark"} theme="dark">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" && <Sun className="rt-size-5" />}
        {theme === "light" && <Moon className="rt-size-5" />}
        <span className="rt-sr-only">
          {theme === "dark" ? "Light" : "Dark"}
        </span>
      </Button>
    </ActionTooltip>
  );
}
