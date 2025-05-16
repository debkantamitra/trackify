// src/hooks/useApi.ts
import { useState } from 'react';

type AsyncFn<TArgs extends any[], TResult> = (...args: TArgs) => Promise<TResult>;

export function useApi<TArgs extends any[], TResult>(
  asyncFn: AsyncFn<TArgs, TResult>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = async (...args: TArgs): Promise<TResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn(...args);

      return result;
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { call, loading, error };
}
