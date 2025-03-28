export interface IPaginationQuery {
  page?: number;
  limit?: number;
}

export interface IQuery extends IPaginationQuery {
  q?: string;
}
