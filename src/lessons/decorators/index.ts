import 'reflect-metadata';
// ---1---
(function () {
  interface IUserService {
    users: number;
    getUsersInDB(): number;
  }

  class UserService implements IUserService {
    users: number = 1000;
    getUsersInDB(): number {
      return this.users;
    }
  }

  function nullUser(obj: IUserService) {
    obj.users = 0;
    return obj;
  }

  function logUsers(obj: IUserService) {
    console.log('Users: ' + obj.users);
    return obj;
  }

  /*
  console.log('1', new UserService().getUsersInDB());
  console.log(
    '1',
    nullUser(new UserService()).getUsersInDB(),
  );
  console.log(
    '1',
    logUsers(nullUser(new UserService())).getUsersInDB(),
  );
  */
})();

// ---2-3 Decorators of Classes, Fabrika for decorators---
(function () {
  interface IUserService {
    users: number;
    getUsersInDB(): number;
  }

  @log()
  // @nullUser
  @setUsers(15)
  @CreatedAt
  // @threeUserAdvanced
  // @setUsersAdvanced(31)
  class UserService implements IUserService {
    users: number = 1000;
    getUsersInDB(): number {
      return this.users;
    }
  }

  // before set number
  function nullUser(target: Function) {
    target.prototype.users = 0;
  }

  function setUsers(users: number) {
    //console.log('setUsers init');
    return (target: Function) => {
      //console.log('setUsers run');
      target.prototype.users = users;
    };
  }

  // after set number
  function threeUserAdvanced<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      users = 3;
    };
  }

  function setUsersAdvanced(users: number) {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
      return class extends constructor {
        users = users;
      };
    };
  }

  function log() {
    //console.log('log init');
    return (target: Function) => {
      //console.log('log run: ', target);
    };
  }

  /*
  function CreatedAt(date: Date) {
    return <T extends { new (...args: any[]): {} }>(
      constructor: T,
    ) => {
      return class extends constructor {
        createdAt = date.toString();
      };
    };
  }
*/
  function CreatedAt<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      createdAt = new Date().toString();
    };
  }

  type CreatedAt = {
    createdAt: Date;
  };

  /*
  console.log('2', new UserService());
  console.log('2', (new UserService() as IUserService & CreatedAt).createdAt);
  */
})();

// ---3-4 Decorators of Methods / Characteristic (Properties, Variables) ---
(function () {
  interface IUserService {
    users: number;
    getUsersInDB(): number;
  }

  class UserService implements IUserService {
    @Max(100)
    users: number = 1000;

    // @Log
    // @LogFactory()
    @Catch({ rethrow: true })
    getUsersInDB(): number {
      throw new Error('Error');
    }
  }

  // no factory
  function Log(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ): TypedPropertyDescriptor<(...args: any[]) => any> | void {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
    const oldValue = descriptor.value;
    descriptor.value = () => {
      console.log('No Error');
      oldValue;
    };
  }

  // factory
  function LogFactory() {
    return (
      target: Object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
      descriptor.value = () => {
        console.log('No Error');
      };
    };
  }

  function Catch({ rethrow = false }: { rethrow: boolean }) {
    return (
      target: Object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
      const method = descriptor.value;
      descriptor.value = async (...args: any[]) => {
        try {
          const res = await method?.apply(target, args);
          return res;
        } catch (e) {
          if (e instanceof Error) {
            console.log(e.message);
            if (rethrow) {
              throw e;
            }
          }
        }
      };
    };
  }

  function Max(max: number) {
    return (target: Object, propertyKey: string | symbol) => {
      let value: number;
      const setter = function (newValue: number) {
        if (newValue > max) {
          console.log(`Not allowed more then ${max}`);
        } else {
          value = newValue;
        }
      };

      const getter = function () {
        return value;
      };

      Object.defineProperty(target, propertyKey, {
        set: setter,
        get: getter,
      });
    };
  }

  /*
  const userService = new UserService();
  console.log('3', userService);
  console.log('3', userService.getUsersInDB());
  userService.users = 1;
  console.log('3', userService.users);
  userService.users = 1000;
  console.log('3', userService.users);
  */
})();

// ---5 Decorators Accessors / Parameters ---
(function () {
  interface IUserService {
    getUsersInDB(): number;
  }

  class UserService implements IUserService {
    private _users: number = 1000;

    getUsersInDB(): number {
      throw new Error('Error');
    }

    @Log()
    set users(num: number) {
      this._users = num;
    }

    get users() {
      return this._users;
    }
  }

  // Accessors
  function Log() {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      const set = descriptor.set;
      descriptor.set = (...args: any) => {
        console.log(args);
        set?.apply(target, args);
      };
    };
  }

  const userService = new UserService();
  /*
  console.log('5', userService.users);
  */
})();

// ---6-7 Decorators Parameters / Metadata ---
(function () {
  interface IUserService {
    getUsersInDB(): number;
  }

  class UserService implements IUserService {
    private _users: number = 1000;

    getUsersInDB(): number {
      return this._users;
    }

    @Validate()
    setUsersInDB(@Positive() num: number): void {
      this._users = num;
    }
  }
  const POSITIVE_METADATA_KEY = Symbol('POSITIVE_METADATA_KEY');
  function Positive() {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
      console.log(Reflect.getOwnMetadata('design:type', target, propertyKey));
      console.log(Reflect.getOwnMetadata('design:paramtypes', target, propertyKey));
      console.log(Reflect.getOwnMetadata('design:returntype', target, propertyKey));
      let existParams: number[] = Reflect.getOwnMetadata(Symbol('POSITIVE_METADATA_KEY'), target, propertyKey) || [];
      existParams.push(parameterIndex);
      Reflect.defineMetadata(Symbol('POSITIVE_METADATA_KEY'), existParams, target, propertyKey);
      /*
      console.log(target);
      console.log(propertyKey);
      console.log(parameterIndex);
      */
    };
  }

  function Validate() {
    return (
      target: Object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
    ) => {
      let method = descriptor.value;
      descriptor.value = function (...args: any) {
        let positiveParams: number[] = Reflect.getOwnMetadata(Symbol('POSITIVE_METADATA_KEY'), target, propertyKey) || [];
        if (positiveParams) {
          console.log(positiveParams);
          for (let index of positiveParams) {
            if (args[index] < 0) {
              throw new Error('Number need to be more then 0');
            }
          }
        }
        return method?.apply(target, args);
      };
    };
  }

  const userService = new UserService();
  console.log('6', new UserService().setUsersInDB(0));
  console.log('6', userService.setUsersInDB(-1));
})();
