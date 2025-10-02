import { useState, useCallback } from 'react';
import { userApi } from '../services/api/user';
import { WishlistItem } from '../types/user';
import { showErrorToast } from '../utils/handleError';
import { toast } from 'sonner';

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await userApi.fetchWishlist();
      setItems(response.items);
    } catch (error) {
      showErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToWishlist = useCallback(async (productId: string) => {
    setIsLoading(true);
    try {
      const response = await userApi.addToWishlist(productId);
      setItems(response.items);
      toast.success('Added to wishlist');
      return response;
    } catch (error) {
      showErrorToast(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromWishlist = useCallback(async (productId: string) => {
    setIsLoading(true);
    try {
      const response = await userApi.removeFromWishlist(productId);
      setItems(response.items);
      toast.success('Removed from wishlist');
    } catch (error) {
      showErrorToast(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleWishlist = useCallback(async (productId: string) => {
    const isWishlisted = items.some(item => item.productId === productId);

    if (isWishlisted) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  }, [items, addToWishlist, removeFromWishlist]);

  const isInWishlist = useCallback((productId: string) => {
    return items.some(item => item.productId === productId);
  }, [items]);

  return {
    items,
    isLoading,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };
}
