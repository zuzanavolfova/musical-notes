import { useState, useEffect, useRef } from "react";

export function isLoading(): boolean {
  return !!document.querySelector("[data-loading='true']");
}

export function useLoadingState(initialState: boolean = false) {
  const [loading, setLoading] = useState(initialState);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const setLoadingState = (state: boolean) => {
    if (isMountedRef.current) {
      setLoading(state);
    }
  };

  const executeLoading = async <T>(
    asyncFn: () => Promise<T>
  ): Promise<T | null> => {
    if (!isMountedRef.current) return null;
    
    setLoadingState(true);
    try {
      const result = await asyncFn();
      return result;
    } catch (error) {
      console.error("Error in operation:", error);
      throw error;
    } finally {
      setLoadingState(false);
    }
  };

  return {
    loading,
    setLoading: setLoadingState,
    executeLoading,
    isGlobalLoading: isLoading,
  };
}