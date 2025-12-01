// This file allow me handling API Request without distracting the components
import { useState, useEffect } from "react";


// use Custom Hook
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => { // Function call with generic tyoe
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true); // Update loading state
      setError(null); // update error state

      const result = await fetchFunction(); 
      setData(result);

      // Error handling
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset function 
  const reset = () => {
    // Clear States Value
    setData(null);
    setError(null);
    setLoading(false);
  };

  // "As soon as the component load i should automatically fetch data."
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset }; // Return data
};

export default useFetch;
