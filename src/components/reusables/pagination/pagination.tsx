import { useMemo } from "react";
import { IPagination, IPaginationQuery } from "../../types";
import { Button } from "../button/button";
import { Select } from "../select/select";

interface PROPS {
  currentPaginationResponse: IPagination;
  currentPaginationState: IPaginationQuery;
  onPageChange: (page: number) => void;
  onPageSizeChange: (limit: number) => void;
}
export const Pagination = (props: PROPS) => {
  const {
    onPageSizeChange,
    currentPaginationState,
    currentPaginationResponse,
    onPageChange,
  } = props;

  const definePageButtons = useMemo(() => {
    const { current_page, last_visible_page } = currentPaginationResponse;
    const buttons = [];
    const totalPages = last_visible_page;
    const currentPage = current_page;
    const maxDisplayed = 3;

    let startPage: number, endPage: number;

    if (totalPages <= maxDisplayed) {
      startPage = 1;
      endPage = totalPages;
    } else {
      startPage = Math.max(1, currentPage - 2);
      endPage = startPage + maxDisplayed - 1;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxDisplayed + 1;
      }
    }

    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          isActive={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          1
        </Button>,
      );
      if (startPage > 2) {
        buttons.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          isActive={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="end-ellipsis">...</span>);
      }
      buttons.push(
        <Button
          key={totalPages}
          isActive={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>,
      );
    }

    return buttons;
  }, [currentPaginationResponse, onPageChange]);

  const definePaginationButton = useMemo(() => {
    return (
      <>
        <Button
          onClick={() => {
            if (currentPaginationState.page) {
              onPageChange(currentPaginationState.page - 1);
            }
          }}
          disabled={currentPaginationState.page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Button>
        {definePageButtons}
        <Button
          onClick={() => {
            if (currentPaginationState.page) {
              onPageChange(currentPaginationState.page + 1);
            }
          }}
          disabled={
            currentPaginationState.page ===
            currentPaginationResponse.last_visible_page
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Button>
      </>
    );
  }, [
    currentPaginationResponse.last_visible_page,
    currentPaginationState.page,
    definePageButtons,
    onPageChange,
  ]);

  return (
    <div className="flex flex-row items-center justify-between">
      <Select
        value={currentPaginationState.limit}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </Select>
      <div className="flex flex-row items-center justify-center gap-2">
        {definePaginationButton}
      </div>
    </div>
  );
};
