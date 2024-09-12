import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@repo/react-ui";

export const ReactPage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center h-full flex-col">
      <div className="flex justify-center gap-4 items-center p-2 mb-4">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="h-16 p-1.5" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="animate-spin h-16 p-1.5 will-change-auto"
            alt="React logo"
          />
        </a>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1>Vite + React</h1>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </div>
  );
};
