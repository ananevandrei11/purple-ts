(function () {
  interface IUser {
    name: string;
    age?: number;
    email: string;
  }

  type PartialCustom = Partial<IUser>;
  type RequiredCustom = Required<IUser>;
  type ReadOnlyCustom = Readonly<IUser>;
  type ReadOnlyRequiredCustom = Required<Readonly<IUser>>;
})();
