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
