import { useCallback, useState } from "react";

export const useClientRect = (): [
  DOMRect | undefined,
  (node: HTMLElement | null) => void,
] => {
  const [rect, setRect] = useState<DOMRect>();
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const resizeObserver = new ResizeObserver(() => {
      setRect(node.getBoundingClientRect());
    });
    resizeObserver.observe(node);
  }, []);

  return [rect, ref];
};
