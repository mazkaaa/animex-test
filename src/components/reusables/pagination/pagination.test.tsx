import { fireEvent, render, screen } from "@testing-library/react";
import { IPagination, IPaginationQuery } from "../../types";
import { Pagination } from "./pagination";

describe("Pagination Component", () => {
  const paginationResponse: IPagination = {
    current_page: 1,
    last_visible_page: 5,
    has_next_page: true,
    items: {
      count: 50,
      per_page: 10,
      total: 50,
    },
  };
  const paginationState: IPaginationQuery = { limit: 10, page: 1 };

  test("calls onPageSizeChange when a new page size is selected", () => {
    const onPageChange = jest.fn();
    const onPageSizeChange = jest.fn();

    render(
      <Pagination
        currentPaginationResponse={paginationResponse}
        currentPaginationState={paginationState}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />,
    );

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "15" } });

    expect(onPageSizeChange).toHaveBeenCalledWith(15);
  });
});
