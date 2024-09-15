import { Spinner } from "@repo/react-ui";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "angular-page": any;
    }
  }
}

const AngularPage = () => {
  const [loading, setLoading] = useState(true);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    import("angular/AngularPage")
      .catch(() => {
        showBoundary("Error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="rt-w-full rt-h-full rt-p-6 rt-flex rt-justify-center rt-items-center">
      {loading ? <Spinner size={"lg"} /> : <angular-page />}
    </div>
  );
};

export default AngularPage;
