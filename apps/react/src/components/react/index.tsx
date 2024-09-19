import { Button, cn } from "@repo/react-ui";
import { useGeneralStore } from "@repo/util";
import { ReactIcon } from "@/components/icon/react";
import { useState } from "react";
import { TodoApp } from "@/components/react/todo-app";

const ReactPage = () => {
  const { count, setCount } = useGeneralStore();
  const [showApp, setShowApp] = useState(false);

  return (
    <div className="rt-flex rt-items-center rt-justify-center rt-h-full rt-flex-col rt-gap-2">
      <ReactIcon className="rt-animate-spin-slow rt-h-28 rt-p-1.5 rt-will-change-auto" />
      <h1>Vite + React</h1>
      <div className="rt-flex rt-items-center rt-justify-center rt-gap-2">
        <Button onClick={() => setCount(1)}>Count is {count}</Button>
        <Button variant="destructive" onClick={() => setShowApp(!showApp)}>
          Todo apps ^^
        </Button>
      </div>
      <div
        className={cn(
          "rt-flex rt-flex-col rt-items-center rt-gap-4 rt-transition-all rt-duration-1000 rt-max-h-0",
          showApp && "!rt-max-h-[100vh]"
        )}
      >
        {showApp && <TodoApp />}
      </div>
    </div>
  );
};

export default ReactPage;
