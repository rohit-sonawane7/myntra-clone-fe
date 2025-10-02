import { apiClient } from './client';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../types/auth';
import { User } from '../../types/user';

export const authApi = {
  login: async (request: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', request);
    if (response.token) {
      apiClient.setToken(response.token);
    }
    return response;
  },

  register: async (request: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', request);
    if (response.token) {
      apiClient.setToken(response.token);
    }
    return response;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post<void>('/auth/logout');
    } finally {
      apiClient.clearToken();
    }
  },

  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me');
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/refresh');
    if (response.token) {
      apiClient.setToken(response.token);
    }
    return response;
  },
};
