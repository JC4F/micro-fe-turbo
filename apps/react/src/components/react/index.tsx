import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@repo/react-ui";
import { useGeneralStore } from "@/strore";

const ReactPage = () => {
  const { count, setCount } = useGeneralStore();

  return (
    <div className="rt-flex rt-items-center rt-justify-center rt-h-full rt-flex-col">
      <div className="rt-flex rt-justify-center rt-gap-4 rt-items-center rt-p-2 rt-mb-4">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="rt-h-16 rt-p-1.5" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="rt-animate-spin rt-h-16 rt-p-1.5 rt-will-change-auto"
            alt="React logo"
          />
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
