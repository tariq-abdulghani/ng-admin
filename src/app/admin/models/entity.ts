export interface EntityViewsConfig {
  label: string;
  icon?: string;
  description: string;

  webService: {
    resourceURI: string;
    paginated: boolean;
  };
  createOrUpdateView: {
    formEntity: any;
  };
  tableView: {
    displayedColumns: string[];
    actions: {
      edit: {
        label: string;
        enableEditFn?: (row: any) => boolean;
      };
      delete: {
        label: string;
        enableDeleteFn?: (row: any) => boolean;
      };
    };
  };
}

export interface Link {
  href: string;
  rel: string;
  type: 'GET' | 'POST' | 'UPDATE' | 'PATCH';
}

export interface RestResource {
  name: string;
  description?: string;
  icon?: string;
  links: Link[];
}
