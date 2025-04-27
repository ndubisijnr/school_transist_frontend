import { useEffect, useRef, useState } from 'react';

interface UseDebouncedSearchProps {
  searchQuery: string;
  readStoreFrontProducts: (query: string | null, signal?: AbortSignal) => Promise<void>;
  delay?: number; // Debounce delay, default to 500ms
}

export function useDebouncedSearchWithCancel({
  searchQuery,
  readStoreFrontProducts,
  delay = 500,
}: UseDebouncedSearchProps) {
  const [debouncedQuery, setDebouncedQuery] = useState<string | null>(null);
  const prevQueryRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Skip if query hasn't changed
    if (searchQuery.trim() === prevQueryRef.current?.trim()) return;

    // Abort any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timer = setTimeout(() => {
      const trimmed = searchQuery.trim();
      const finalQuery = trimmed !== '' ? trimmed : null;
      prevQueryRef.current = trimmed;

      setDebouncedQuery(finalQuery); // Store the debounced query

      // Trigger the function to read the products
      readStoreFrontProducts(finalQuery, controller.signal).catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Search failed:', err);
        }
      });
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort(); // cancel the request if query changes or on cleanup
    };
  }, [searchQuery, readStoreFrontProducts, delay]);

  return debouncedQuery;
}
