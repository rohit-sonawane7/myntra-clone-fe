import { apiClient } from './client';
import { Order, PlaceOrderRequest, OrdersResponse } from '../../types/order';

export const ordersApi = {
  fetchOrders: async (page: number = 1, limit: number = 10): Promise<OrdersResponse> => {
    return apiClient.get<OrdersResponse>(`/orders?page=${page}&limit=${limit}`);
  },

  fetchOrderById: async (orderId: string): Promise<Order> => {
    return apiClient.get<Order>(`/orders/${orderId}`);
  },

  placeOrder: async (request: PlaceOrderRequest): Promise<Order> => {
    return apiClient.post<Order>('/orders', request);
  },

  cancelOrder: async (orderId: string): Promise<Order> => {
    return apiClient.patch<Order>(`/orders/${orderId}/cancel`);
  },
};
