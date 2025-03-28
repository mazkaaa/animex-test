"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimeListSection } from ".";
import { Button, Input, Pagination } from "../reusables";
import { AnimeService } from "../services";
import { IAnimeResponse, IResponses } from "../types";

export const AnimeContentSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<
    IResponses<IAnimeResponse> | undefined
  >(undefined);

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const fetchData = useCallback(async () => {
    const { getAnimeList } = AnimeService();
    setIsLoading(true);
    try {
      const response = await getAnimeList({
        limit: pagination.limit,
        page: pagination.page,
        q: search,
      });
      setResponse(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.limit, pagination.page, search]);

  const handlePageChange = useCallback(
    (page: number) => {
      setPagination((prev) => ({
        ...prev,
        page,
      }));
    },
    [setPagination],
  );

  const handlePageSizeChange = useCallback(
    (limit: number) => {
      setPagination((prev) => ({
        ...prev,
        limit,
      }));
    },
    [setPagination],
  );

  const defineListSection = useMemo(() => {
    if (isLoading || !response) {
      return <div className="text-center">Loading...</div>;
    }
    return (
      <>
        <AnimeListSection data={response.data} />
        <Pagination
          onPageSizeChange={handlePageSizeChange}
          onPageChange={handlePageChange}
          currentPaginationState={pagination}
          currentPaginationResponse={response.pagination}
        />
      </>
    );
  }, [handlePageChange, handlePageSizeChange, isLoading, pagination, response]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setDebouncedSearch(value);
    },
    [],
  );

  const defineClearSearchButton = useMemo(() => {
    if (debouncedSearch) {
      return (
        <Button
          onClick={() => {
            setDebouncedSearch("");
            setSearch("");
          }}
          variant="secondary"
        >
          Clear
        </Button>
      );
    }
    return null;
  }, [debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearch]);

  return (
    <section className="space-y-4">
      <div className="flex flex-row items-center space-x-2">
        <Input
          onChange={handleSearch}
          value={debouncedSearch}
          placeholder="Search"
          type="text"
          className="w-full md:w-72"
        />
        {defineClearSearchButton}
      </div>
      {defineListSection}
    </section>
  );
};
