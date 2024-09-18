import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientManager } from "@repo/util";

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

// Create a client
const queryClient = QueryClientManager.getInstance();

export const QueryClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showDevtools, setShowDevtools] = React.useState(false);

  React.useEffect(() => {
    console.log(import.meta.env.VITE_MODE);

    if (import.meta.env.VITE_MODE === "development") setShowDevtools(true);
  }, []);

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
};
