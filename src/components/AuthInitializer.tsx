import React from "react";
import { useAppSelector } from "../store/hooks";
import { useCurrentUser } from "../hooks/useAuth";

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isLoading } = useCurrentUser();

  if (isAuthenticated && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthInitializer;
