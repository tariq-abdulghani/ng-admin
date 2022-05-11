import { Table } from '../admin/decorators/table';
import { WebResource } from '../admin/decorators/web-resource';
import { FormEntity } from '../dynamic-form/core/models/decorators/forms/forms';
import { Nullable } from '../admin/utils/nullable';
import {
  CheckboxInput,
  NumberInput,
  SelectInput,
  TextInput,
} from '../dynamic-form/core/models/decorators/inputs/inputs';
import {
  Id,
  UpdateOverride,
} from '../dynamic-form/core/models/decorators/context/form-context';
import { Required } from '../dynamic-form/core/models/decorators/validation/sync/required';

@WebResource({
  name: 'todo',
  links: [
    {
      rel: 'todos',
      type: 'GET',
      href: 'https://jsonplaceholder.typicode.com',
    },
    {
      rel: 'todos',
      type: 'POST',
      href: 'https://jsonplaceholder.typicode.com',
    },
    {
      rel: 'todos',
      type: 'PUT',
      href: 'https://jsonplaceholder.typicode.com',
    },
    {
      rel: 'todos',
      type: 'DELETE',
      href: 'https://jsonplaceholder.typicode.com',
    },
  ],
})
@Table({
  columns: ['id', 'title', 'completed'],
})
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
