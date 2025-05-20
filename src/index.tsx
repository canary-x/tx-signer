import "./styles/index.css";
import "./lib/dynamicImportErrorListener.ts";

import { Toaster } from "sonner";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/app.routes.tsx";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import { WagmiProvider } from "wagmi";
import { chains, metadata, projectId, wagmiAdapter } from "./wagmi.ts";
import { createAppKit } from "@reown/appkit/react";

createAppKit({
  adapters: [wagmiAdapter],
  networks: [chains[0], ...chains],
  metadata: metadata,
  projectId,
  features: {
      analytics: false,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          retry: false,
      },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            {/* <TransactionProgressModal/> */}
            <Toaster richColors />
            <AppRoutes />
          </QueryClientProvider>
        </WagmiProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
