import { sortBy } from 'sort-by';

let usersSortBy = [];

usersSortBy = [
  {
    id: 7,
    name: 'Foo',
    age: '34',
    email: { primary: 'foo@email.com' },
  },
  {
    id: 3,
    name: 'Baz',
    age: '67',
    email: { primary: 'baz@email.com' },
  },
  {
    id: 4,
    name: 'Bar',
    age: '67',
    email: { primary: 'bar@email.com' },
  },
];

console.log(usersSortBy.sort(sortBy('age', 'name')));
