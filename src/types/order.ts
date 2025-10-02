import { Address } from './user';

export interface OrderItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  placedAt: string | Date;
  deliveryAddress: Address;
  paymentMethod?: string;
  trackingNumber?: string;
}

export interface PlaceOrderRequest {
  items: OrderItem[];
  addressId: string;
  paymentMethod: string;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
}
