import { QueryClientWrapper } from "@/components/wrapper/query-client";
import { ThemeWrapper } from "@/components/wrapper/theme";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeWrapper>
      <QueryClientWrapper>{children}</QueryClientWrapper>
    </ThemeWrapper>
  );
};
