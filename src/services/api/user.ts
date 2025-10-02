import { apiClient } from './client';
import {
  User,
  Address,
  UpdateUserRequest,
  AddAddressRequest,
  UpdateAddressRequest,
  WishlistResponse,
} from '../../types/user';

export const userApi = {
  fetchUserProfile: async (): Promise<User> => {
    return apiClient.get<User>('/user/profile');
  },

  updateUserProfile: async (request: UpdateUserRequest): Promise<User> => {
    return apiClient.patch<User>('/user/profile', request);
  },

  fetchAddresses: async (): Promise<Address[]> => {
    return apiClient.get<Address[]>('/user/addresses');
  },

  addAddress: async (request: AddAddressRequest): Promise<Address> => {
    return apiClient.post<Address>('/user/addresses', request);
  },

  updateAddress: async (addressId: string, request: UpdateAddressRequest): Promise<Address> => {
    return apiClient.patch<Address>(`/user/addresses/${addressId}`, request);
  },

  deleteAddress: async (addressId: string): Promise<void> => {
    return apiClient.delete<void>(`/user/addresses/${addressId}`);
  },

  fetchWishlist: async (): Promise<WishlistResponse> => {
    return apiClient.get<WishlistResponse>('/wishlist');
  },

  addToWishlist: async (productId: string): Promise<WishlistResponse> => {
    return apiClient.post<WishlistResponse>('/wishlist', { productId });
  },

  removeFromWishlist: async (productId: string): Promise<WishlistResponse> => {
    return apiClient.delete<WishlistResponse>(`/wishlist/${productId}`);
  },
};
