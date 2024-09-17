import { Button, cn } from "@repo/react-ui";
import { useGeneralStore } from "@/store";
import { ReactIcon } from "@/components/icon/react";
import { useState } from "react";
import { TodoApp } from "@/components/react/todo-app";

const ReactPage = () => {
  const { count, setCount } = useGeneralStore();
  const [showApp, setShowApp] = useState(false);

  return (
    <div className="rt-flex rt-items-center rt-justify-center rt-h-full rt-flex-col">
      <div className="rt-flex rt-justify-center rt-gap-4 rt-items-center rt-p-2 rt-mb-4">
        <a href="https://react.dev" target="_blank">
          <ReactIcon className="rt-animate-spin-slow rt-h-28 rt-p-1.5 rt-will-change-auto" />
        </a>
      </div>
      <div
        className={cn(
          "rt-flex rt-flex-col rt-items-center rt-gap-4 rt-transition-all rt-duration-1000 rt-max-h-0",
          showApp && "!rt-max-h-[100vh]"
        )}
      >
        <h1>Vite + React</h1>
        <div className="rt-flex rt-items-center rt-justify-center rt-gap-2">
          <Button onClick={() => setCount(1)}>Count is {count}</Button>
          <Button variant="destructive" onClick={() => setShowApp(!showApp)}>
            Todo apps ^^
          </Button>
        </div>
        {showApp && <TodoApp />}
      </div>
    </div>
  );
};

export default ReactPage;
