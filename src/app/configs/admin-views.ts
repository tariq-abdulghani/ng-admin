import { EntityViewsConfig } from '../admin/models/entity';

export const entityViewsConfigArray: EntityViewsConfig[] = [
  {
    label: 'todo',
    description: 'todo items ',
    createOrUpdateView: {
      formEntity: '',
    },
    webService: {
      resourceURI: 'https://jsonplaceholder.typicode.com/todos',
      paginated: false,
    },
    tableView: {
      displayedColumns: ['userId', 'id', 'title', 'completed'],
      actions: {
        edit: {
          label: 'edit',
        },
        delete: {
          label: 'delete',
        },
      },
    },
  },
  {
    label: 'user',
    description: 'system users ',
    createOrUpdateView: {
      formEntity: '',
    },
    webService: {
      resourceURI: 'https://jsonplaceholder.typicode.com/users',
      paginated: false,
    },
    tableView: {
      displayedColumns: [
        'id',
        'name',
        'username',
        'email',
        'phone',
        'website',
        'company',
        // 'actions',
      ],

      actions: {
        edit: {
          label: 'edit',
        },
        delete: {
          label: 'delete',
        },
      },
    },
  },

  {
    label: 'comments',
    description: 'comments related to posts',
    createOrUpdateView: {
      formEntity: '',
    },
    webService: {
      resourceURI: 'https://jsonplaceholder.typicode.com/comments',
      paginated: false,
    },
    tableView: {
      displayedColumns: ['postId', 'id', 'name', 'email', 'body'],

      actions: {
        edit: {
          label: 'edit',
        },
        delete: {
          label: 'delete',
        },
      },
    },
  },
 
  {
    label: 'albums',
    description: ' albums',
    createOrUpdateView: {
      formEntity: '',
    },
    webService: {
      resourceURI: 'https://jsonplaceholder.typicode.com/albums',
      paginated: false,
    },
    tableView: {
      displayedColumns: ['userId', 'id', 'title'],

      actions: {
        edit: {
          label: 'edit',
        },
        delete: {
          label: 'delete',
        },
      },
    },
  },
];
