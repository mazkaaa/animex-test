export interface IResponse<T> {
  data: T;
}

export interface IResponses<T> {
  data: T[];
  pagination: IPagination;
}

export interface IPagination {
  current_page: number;
  has_next_page: boolean;
  last_visible_page: number;
  items: IPaginationItems;
}
export interface IPaginationItems {
  count: number;
  total: number;
  per_page: number;
}
