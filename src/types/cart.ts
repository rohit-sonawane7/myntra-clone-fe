export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  price?: number;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
