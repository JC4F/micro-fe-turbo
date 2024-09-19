import { useGeneralStore } from "@repo/util";
import React from "react";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useGeneralStore();

  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};
