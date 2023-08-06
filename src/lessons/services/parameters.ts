(function () {
  class User {
    constructor(public id: number, public name: string) {}
  }

  function getData(id: number) {
    return new User(id, 'Name');
  }

  type RT = ReturnType<typeof getData>;

  type ParametersRT = Parameters<typeof getData>;
  type RT2 = ReturnType<<T>() => T>; // unknown
  type RT3 = ReturnType<<T extends object>() => T>;
  type FirstParameter = ParametersRT[0];
  type CP = ConstructorParameters<typeof User>;
  type IT = InstanceType<typeof User>;
})();
