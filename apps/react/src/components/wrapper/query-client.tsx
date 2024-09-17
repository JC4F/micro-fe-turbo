import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

// Create a client
const queryClient = new QueryClient();

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
