import React from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "../store";
import { queryClient } from "../lib/queryClient";
import AuthInitializer from "../components/AuthInitializer";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.warn("VITE_GOOGLE_CLIENT_ID is not configured");
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={googleClientId || ""}>
          <AuthInitializer>{children}</AuthInitializer>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default AppProviders;
