import { apiClient } from './client';
import { CartResponse, AddToCartRequest, UpdateCartItemRequest } from '../../types/cart';

export const cartApi = {
  fetchCart: async (): Promise<CartResponse> => {
    return apiClient.get<CartResponse>('/cart');
  },

  addToCart: async (request: AddToCartRequest): Promise<CartResponse> => {
    return apiClient.post<CartResponse>('/cart', request);
  },

  updateCartItem: async (itemId: string, request: UpdateCartItemRequest): Promise<CartResponse> => {
    return apiClient.patch<CartResponse>(`/cart/${itemId}`, request);
  },

  removeCartItem: async (itemId: string): Promise<CartResponse> => {
    return apiClient.delete<CartResponse>(`/cart/${itemId}`);
  },

  clearCart: async (): Promise<void> => {
    return apiClient.delete<void>('/cart');
  },
};
