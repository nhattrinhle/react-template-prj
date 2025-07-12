import React from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useGoogleLogin } from "../../hooks/useAuth";

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onError }) => {
  const googleLoginMutation = useGoogleLogin();

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      onError?.("No credential received from Google");
      return;
    }

    try {
      await googleLoginMutation.mutateAsync({
        credential: credentialResponse.credential,
      });

      onSuccess?.();
      console.log("Login successful!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      onError?.(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleGoogleError = () => {
    const errorMessage = "Google login failed";
    onError?.(errorMessage);
    console.error(errorMessage);
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="100%"
        logo_alignment="left"
      />
    </div>
  );
};

export default GoogleLoginButton;
