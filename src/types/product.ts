export interface Product {
  id: string;
  image: string;
  brand: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  category: string;
  sizes?: string[];
  colors?: string[];
  description?: string;
  images?: string[];
}

export interface ProductFilters {
  category?: string;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  discount?: number;
  color?: string[];
  size?: string[];
  rating?: number;
  page?: number;
  limit?: number;
  featured?: boolean;
  search?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
