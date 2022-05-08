import { CrudLink } from '../decorators/web-resource';

export interface ActionSpec {
  entityLabel: string;
  action: 'create' | 'update';
  formEntity: any;
  initialValue: any | null;
}

export interface RowContext {
  entityLabel: string;
  formEntity: any;
  row: any | null;
  links: CrudLink[];
  idField?: string;
  mediaType?: any;
}

export interface EntityViewContext {
  entityLabel: string;
  formEntity: any;
  data: any[] | null;
  links: CrudLink[];
  idField?: string;
  mediaType?: any;
  paginationInfo?: any;
}
