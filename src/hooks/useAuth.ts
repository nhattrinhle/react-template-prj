import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authAPI,
  type GoogleLoginRequest,
  type EmailLoginRequest,
  type RegisterRequest,
} from "../services/authService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginStart, loginSuccess, loginFailure, logout, setUser } from "../store/slices/authSlice";

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

// Get current user query
export const useCurrentUser = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: authKeys.user(),
    queryFn: authAPI.getCurrentUser,
    enabled: isAuthenticated,
  });

  if (query.data && !query.error) {
    dispatch(setUser(query.data));
  }

  if (query.error) {
    dispatch(logout());
  }

  return query;
};

// Google login mutation
export const useGoogleLogin = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: GoogleLoginRequest) => authAPI.googleLogin(request),
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
      queryClient.setQueryData(authKeys.user(), data.user);
    },
    onError: () => {
      dispatch(loginFailure());
    },
  });
};

// Email login mutation
export const useEmailLogin = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: EmailLoginRequest) => authAPI.emailLogin(request),
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
      queryClient.setQueryData(authKeys.user(), data.user);
    },
    onError: () => {
      dispatch(loginFailure());
    },
  });
};

// Register mutation
export const useRegister = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: RegisterRequest) => authAPI.register(request),
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
      queryClient.setQueryData(authKeys.user(), data.user);
    },
    onError: () => {
      dispatch(loginFailure());
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      dispatch(logout());
      queryClient.clear();
    },
  });
};
