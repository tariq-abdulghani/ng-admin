# Admin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

admin project to perform simple crud on entities
under development till now take the source and run `ng s`
and go to `http://localhost:4200/admin/todo`

it abstracts each entity to many aspects
just provide the description and the implementation is there, and you can add more actions to the table
it has a dependency on `https://www.npmjs.com/package/ddd-form`

```typescript
const TODO_API: CrudLink[] = [
  {
    rel: "todos",
    type: "GET",
    href: "https://jsonplaceholder.typicode.com",
  },
  {
    rel: "todos",
    type: "POST",
    href: "https://jsonplaceholder.typicode.com",
  },
  {
    rel: "todos",
    type: "PUT",
    href: "https://jsonplaceholder.typicode.com",
  },
  {
    rel: "todos",
    type: "DELETE",
    href: "https://jsonplaceholder.typicode.com",
  },
];

const TODO_TABLE: TableSpec = {
  columns: [
    { key: "id", displayName: "Id", type: "string" },
    { key: "title", displayName: "Title", type: "string" },
    { key: "completed", displayName: "Completed", type: "boolean" },
  ],
};

@WebResource({
  name: "todo",
  links: TODO_API,
})
@Table(TODO_TABLE)
@FormEntity({ name: "todo" })
export class Todo {
  @Id({ generate: "SERVER" })
  @NumberInput({
    id: "todo-id",
    name: "id",
    label: "id",
    readonly: true,
  })
  id: Nullable<number> = null;

  @Required({ message: "field is mandatory" })
  @SelectInput({
    id: "user-id",
    name: "userId",
    bindLabel: "name",
    bindValue: "id",
    dataSource: new URL("https://jsonplaceholder.typicode.com/users"),
    compareWith: (a, b) => JSON.stringify(a) == JSON.stringify(b),
    label: "user",
  })
  userId: Nullable<number> = null;

  @Required({ message: "field is mandatory" })
  @TextInput({
    id: "title",
    name: "title",
    type: "text",
    label: "title",
  })
  title: Nullable<string> = null;

  @CheckboxInput({
    id: "completed",
    name: "completed",
    label: "completed",
  })
  completed = false;
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/admin`. The app will automatically reload if you change any of the source files.
