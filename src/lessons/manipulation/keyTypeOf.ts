(function () {
  interface User {
    name: string;
    age: number;
  }

  type KeyOfUser = keyof User;

  const keyUser: KeyOfUser = 'name';
  function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  const user: User = {
    age: 30,
    name: 'Name',
  };

  const userName = getValue(user, 'name');
  console.log(userName);

  interface Data {
    group: number;
    name: string;
  }

  const data: Data[] = [
    {
      group: 1,
      name: 'a',
    },
    {
      group: 1,
      name: 'b',
    },
    {
      group: 2,
      name: 'c',
    },
  ];

  interface IGroup<T> {
    [key: string]: T[];
  }

  type key = string | number | symbol;

  function group<T extends Record<key, any>>(
    array: T[],
    key: keyof T,
  ): IGroup<T> {
    return array.reduce<IGroup<T>>(
      (map: IGroup<T>, item) => {
        const itemKey = item[key];
        let curEl = map[itemKey];
        if (Array.isArray(curEl)) {
          curEl.push(item);
        } else {
          curEl = [item];
        }
        map[itemKey] = curEl;
        return map;
      },
      {},
    );
  }
  console.log(group(data, 'group'));

  let stringOrNumber: string | number;
  if (Math.random() > 0.5) {
    stringOrNumber = 0;
  } else {
    stringOrNumber = 'string';
  }

  if (typeof stringOrNumber === 'string') {
    console.log(stringOrNumber);
  } else {
    console.log(stringOrNumber);
  }

  let stringOrNumber2: typeof stringOrNumber;

  const user2 = {
    name: 'Name User 2',
  };

  type keyOfUser2 = keyof typeof user2;

  enum Direction {
    Up,
    Down,
  }

  type direction = keyof typeof Direction;

  const down: direction = 'Down';
  const up: direction = 'Up';

  interface Role {
    name: string;
  }

  interface Permission {
    endDate: Date;
  }

  interface User3 {
    name: string;
    roles: Role[];
    permission: Permission;
  }

  const user3: User3 = {
    name: 'Name',
    roles: [],
    permission: {
      endDate: new Date(),
    },
  };

  const nameUser3 = user3['name'];

  type rolesType = User3['roles'];
  // get element of array via index user3.roles[0]
  type roleType = User3['roles'][number];
  type dateType = User3['permission']['endDate'];
  // get types as constants
  const roles = ['admin', 'user', 'superUser'] as const;
  type roleType2 = (typeof roles)[number];
})();
