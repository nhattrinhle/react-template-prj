import api from "../lib/axios";
import type { User } from "../store/slices/authSlice";

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface GoogleLoginRequest {
  credential: string;
}

export interface EmailLoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// Auth API functions
export const authAPI = {
  // Google OAuth login
  googleLogin: async (request: GoogleLoginRequest): Promise<LoginResponse> => {
    const response = await api.post("/auth/google", request);
    return response.data;
  },

  // Email/Password login
  emailLogin: async (request: EmailLoginRequest): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", request);
    return response.data;
  },

  // Register
  register: async (request: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post("/auth/register", request);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await api.post("/auth/refresh", { refreshToken });
    return response.data;
  },
};
