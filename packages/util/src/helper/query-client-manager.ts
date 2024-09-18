import { QueryClient } from "@tanstack/vue-query";

declare global {
  interface Window {
    queryClientManager: QueryClient;
  }
}

export class QueryClientManager {
  private static instance: QueryClient;

  public static getInstance() {
    if (window["queryClientManager"]) {
      QueryClientManager.instance = window["queryClientManager"];
    } else {
      QueryClientManager.instance = new QueryClient();
      window["queryClientManager"] = QueryClientManager.instance;
    }

    return QueryClientManager.instance;
  }
}
