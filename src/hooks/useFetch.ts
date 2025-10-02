import { useState, useEffect, useCallback } from 'react';
import { handleError, ApiError } from '../utils/handleError';

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
}

interface UseFetchOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;

  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await fetchFn();
      setState({ data, isLoading: false, error: null });
      onSuccess?.(data);
      return data;
    } catch (error) {
      const apiError = handleError(error);
      setState(prev => ({ ...prev, isLoading: false, error: apiError }));
      onError?.(apiError);
      throw apiError;
    }
  }, [fetchFn, onSuccess, onError]);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return {
    ...state,
    execute,
    refetch,
    reset,
  };
}
