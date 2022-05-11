import { CrudLink } from '../decorators/web-resource';

export interface TableContext {
  entityLabel: string;
  formEntity: any;
  data: any[];
  links: CrudLink[];
  idField?: string;
  mediaType?: any;
  paginationInfo?: any;
}

export interface RowContext extends TableContext {
  row: any | null;
}

export interface SelectionContext extends TableContext {
  selectedItems: any[] | null;
}
