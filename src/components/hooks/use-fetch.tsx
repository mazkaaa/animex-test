"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseFetchProps<T> {
  queryFn: () => Promise<T>;
  queryTag: unknown[];
}

export type UseFetchReturn<T> =
  | { isPending: true; isError: false; isSuccess: false; data: undefined }
  | { isPending: false; isError: true; isSuccess: false; data: undefined }
  | { isPending: false; isError: false; isSuccess: true; data: T }
  | { isPending: false; isError: false; isSuccess: false; data: undefined };

export const useFetch = <T,>({
  queryFn,
}: UseFetchProps<T>): UseFetchReturn<T> => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const result = useMemo<UseFetchReturn<T>>(() => {
    if (isPending) {
      return {
        isPending: true,
        isError: false,
        isSuccess: false,
        data: undefined,
      };
    }
    if (isError) {
      return {
        isPending: false,
        isError: true,
        isSuccess: false,
        data: undefined,
      };
    }
    if (isSuccess && data !== undefined) {
      return { isPending: false, isError: false, isSuccess: true, data };
    }
    return {
      isPending: false,
      isError: false,
      isSuccess: false,
      data: undefined,
    };
  }, [isPending, isError, isSuccess, data]);

  const fetchData = useCallback(async () => {
    setIsPending(true);
    setIsError(false);
    setIsSuccess(false);
    try {
      const response = await queryFn();
      setData(response);
      setIsSuccess(true);
    } catch {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }, [queryFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return result;
};
