import { useState, useEffect, useCallback } from 'react';
import { apiUtils } from './utils.js';

// Custom hook for API calls with loading and error states
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = apiUtils.handleError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  return { data, loading, error, execute };
};

// Custom hook for paginated API calls
export const usePagination = (apiFunction, initialPage = 1, initialLimit = 10) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (pageNum = page, limitNum = limit, ...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(pageNum, limitNum, ...args);
      
      if (pageNum === 1) {
        setData(result.posts || result.data || []);
      } else {
        setData(prev => [...prev, ...(result.posts || result.data || [])]);
      }
      
      setTotalPages(result.totalPages || 0);
      setTotal(result.total || 0);
      setPage(pageNum);
      
      return result;
    } catch (err) {
      const errorMessage = apiUtils.handleError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, page, limit]);

  const loadMore = useCallback(() => {
    if (page < totalPages) {
      fetchData(page + 1, limit);
    }
  }, [page, totalPages, limit, fetchData]);

  const refresh = useCallback(() => {
    setData([]);
    setPage(1);
    fetchData(1, limit);
  }, [limit, fetchData]);

  const hasMore = page < totalPages;

  return {
    data,
    loading,
    error,
    page,
    totalPages,
    total,
    hasMore,
    fetchData,
    loadMore,
    refresh,
    setLimit,
  };
};

// Custom hook for search functionality
export const useSearch = (searchFunction, debounceMs = 500) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = useCallback(
    apiUtils.debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await searchFunction(searchQuery);
        setResults(result.posts || result.data || []);
      } catch (err) {
        const errorMessage = apiUtils.handleError(err);
        setError(errorMessage);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs),
    [searchFunction, debounceMs]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearSearch,
  };
};

// Custom hook for file upload with progress
export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFile = useCallback(async (file, uploadFunction) => {
    try {
      setUploading(true);
      setProgress(0);
      setError(null);

      // Validate file
      if (!apiUtils.validateFileType(file)) {
        throw new Error('Invalid file type');
      }

      if (!apiUtils.validateFileSize(file)) {
        throw new Error('File size too large');
      }

      const result = await uploadFunction(file, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setProgress(100);
      return result;
    } catch (err) {
      const errorMessage = apiUtils.handleError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    uploading,
    progress,
    error,
    uploadFile,
  };
};

// Custom hook for optimistic updates
export const useOptimisticUpdate = () => {
  const [optimisticData, setOptimisticData] = useState(null);

  const performOptimisticUpdate = useCallback(async (
    currentData,
    optimisticUpdate,
    apiCall,
    rollbackFn
  ) => {
    // Apply optimistic update
    const updatedData = optimisticUpdate(currentData);
    setOptimisticData(updatedData);

    try {
      // Perform actual API call
      const result = await apiCall();
      setOptimisticData(null);
      return result;
    } catch (error) {
      // Rollback on error
      if (rollbackFn) {
        rollbackFn();
      }
      setOptimisticData(null);
      throw error;
    }
  }, []);

  return {
    optimisticData,
    performOptimisticUpdate,
  };
};

export default {
  useApi,
  usePagination,
  useSearch,
  useFileUpload,
  useOptimisticUpdate,
};
