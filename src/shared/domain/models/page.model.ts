import { PaginationModel } from './pagination.model';

export interface PageModel<TData = any> {
  pagination: PaginationModel;

  data: TData[];
}
