import { apiClient } from './client';
import { Product, ProductFilters, ProductsResponse } from '../../types/product';

export const productsApi = {
  fetchProducts: async (filters?: ProductFilters): Promise<ProductsResponse> => {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, String(v)));
          } else {
            params.append(key, String(value));
          }
        }
      });
    }

    return apiClient.get<ProductsResponse>(`/products?${params.toString()}`);
  },

  fetchProductById: async (id: string): Promise<Product> => {
    return apiClient.get<Product>(`/products/${id}`);
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    return apiClient.get<Product[]>(`/search?q=${encodeURIComponent(query)}`);
  },
};
