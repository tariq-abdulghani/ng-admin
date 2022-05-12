import { Table, TableSpec } from '../admin/decorators/table';
import {
  CREATE,
  DELETE_BY_ID,
  EndPoint,
  GET_ALL,
  UPDATE_BY_ID,
  WebResource,
} from '../admin/decorators/web-resource';
import { FormEntity } from '../dynamic-form/core/models/decorators/forms/forms';
import { Nullable } from '../admin/utils/nullable';
import {
  CheckboxInput,
  NumberInput,
  SelectInput,
  TextInput,
} from '../dynamic-form/core/models/decorators/inputs/inputs';
import { Id } from '../dynamic-form/core/models/decorators/context/form-context';
import { Required } from '../dynamic-form/core/models/decorators/validation/sync/required';

const TODO_API: EndPoint[] = [
  {
    title: GET_ALL,
    uri: 'https://jsonplaceholder.typicode.com',
    uriContext: 'todos',
    method: 'GET',
  },
  {
    title: CREATE,
    uriContext: 'todos',
    method: 'POST',
    uri: 'https://jsonplaceholder.typicode.com',
  },
  {
    title: UPDATE_BY_ID,
    uriContext: 'todos',
    method: 'PUT',
    uri: 'https://jsonplaceholder.typicode.com',
  },
  {
    title: DELETE_BY_ID,
    uriContext: 'todos',
    method: 'DELETE',
    uri: 'https://jsonplaceholder.typicode.com',
  },
];

const TODO_TABLE: TableSpec = {
  columns: [
    { key: 'id', displayName: 'Id', type: 'string' },
    { key: 'title', displayName: 'Title', type: 'string' },
    { key: 'completed', displayName: 'Completed', type: 'boolean' },
  ],
};

@WebResource({
  name: 'todo',
  endPoints: TODO_API,
})
@Table(TODO_TABLE)
@FormEntity({ name: 'todo' })
export class Todo {
  @Id({ generate: 'SERVER' })
  @NumberInput({
    id: 'todo-id',
    name: 'id',
    label: 'id',
    readonly: true,
  })
  id: Nullable<number> = null;

  @Required({ message: 'field is mandatory' })
  @SelectInput({
    id: 'user-id',
    name: 'userId',
    bindLabel: 'name',
    bindValue: 'id',
    dataSource: new URL('https://jsonplaceholder.typicode.com/users'),
    compareWith: (a, b) => JSON.stringify(a) == JSON.stringify(b),
    label: 'user',
  })
  userId: Nullable<number> = null;

  @Required({ message: 'field is mandatory' })
  @TextInput({
    id: 'title',
    name: 'title',
    type: 'text',
    label: 'title',
  })
  title: Nullable<string> = null;

  @CheckboxInput({
    id: 'completed',
    name: 'completed',
    label: 'completed',
  })
  completed = false;
}
