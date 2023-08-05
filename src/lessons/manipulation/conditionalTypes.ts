(function () {
  const a: number = Math.random() > 0.5 ? 1 : 0;

  interface HTTPResponse<T extends 'success' | 'failed'> {
    code: number;
    data: T extends 'success' ? string : Error;
    additionalData: T extends 'success' ? string : number;
  }

  const success: HTTPResponse<'success'> = {
    code: 200,
    data: 'done',
    additionalData: ''
  };

  const error: HTTPResponse<'failed'> = {
    code: 200,
    data: new Error('failed'),
    additionalData: 2
  };

  class User {
    name!: string;
    id!: number;
  }

  class UserPersistent {
    dbId!: string;
  }

  function getUser(
    dbId: string | number,
  ): User | UserPersistent {
    if (typeof dbId === 'number') {
      return new User();
    }
    return new UserPersistent();
  }
})();
