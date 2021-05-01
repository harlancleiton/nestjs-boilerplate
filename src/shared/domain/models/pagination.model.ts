export interface PaginationModel {
  size: number;

  page: number;

  take: number;

  skip: number;

  total: number;

  first: boolean;

  last: boolean;
}
