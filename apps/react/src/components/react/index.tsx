import { Button } from "@repo/react-ui";
import { useGeneralStore } from "@/strore";
import { ReactIcon } from "@/components/icon/react";

const ReactPage = () => {
  const { count, setCount } = useGeneralStore();

  return (
    <div className="rt-flex rt-items-center rt-justify-center rt-h-full rt-flex-col">
      <div className="rt-flex rt-justify-center rt-gap-4 rt-items-center rt-p-2 rt-mb-4">
        <a href="https://react.dev" target="_blank">
          <ReactIcon className="rt-animate-spin-slow rt-h-28 rt-p-1.5 rt-will-change-auto" />
        </a>
      </div>
      <div className="rt-flex rt-flex-col rt-items-center rt-gap-4">
        <h1>Vite + React</h1>
        <Button onClick={() => setCount(1)}>count is {count}</Button>
      </div>
    </div>
  );
};

export default ReactPage;
