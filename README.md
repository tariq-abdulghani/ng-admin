# Admin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

admin project to perform simple crud on entities
under development till now take the source and run `ng s`
and go to `http://localhost:4200/admin`

it abstracts each entity to many aspects

```typescript
export interface EntityViewsConfig {
  // dash board configs
  // where we can see a table of entities in the system
  label: string;
  icon?: string;
  description: string;
  // configures web service that will make the crud operations
  // it must be restful and  apply the best practices of rest end points design
  // ex:
  // GET http://<domain>/resources
  // POST http://<domain>/resources
  // PUT http://<domain>/resources/:id
  // DELETE http://<domain>/resources/:id
  webService: {
    resourceURI: string;
    paginated: boolean;
  };
  // form to create or update its formentity model from my lib ddd-form not added yet
  createOrUpdateView: {
    formEntity: any;
  };
  // table view config which has two actions delete and edit
  //
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
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/admin`. The app will automatically reload if you change any of the source files.
