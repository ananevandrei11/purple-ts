(function () {
  type Modifier = 'read' | 'update' | 'create';

  type UserRoles = {
    customers?: Modifier;
    projects?: Modifier;
    adminPanel?: Modifier;
  };

  type ModifierToAccess<T> = {
    [Property in keyof T]: boolean;
    // +readonly [Property in keyof T]: boolean;
    // [Property in keyof T]+?: boolean; required
    // [Property in keyof T]-?: boolean; not required
  };

  type ModifierToAccessWithNewName<T> = {
    [Property in keyof T as `${string &
      Property}NewName`]: boolean;
    // [Property in keyof T as `NewName${string & Property}`]: boolean;
  };

  type ModifierToAccessWithNewNameExclude<T> = {
    [Property in keyof T as Exclude<
      `${string & Property}NewName`,
      'adminPanelNewName'
    >]: boolean;
  };

  type UserAccess1 = {
    customers?: boolean;
    projects?: boolean;
    adminPanel?: boolean;
  };
  type UserAccess2 = ModifierToAccess<UserRoles>;
  type UserAccess3 = ModifierToAccessWithNewName<UserRoles>;
  type UserRoles4 =
    ModifierToAccessWithNewNameExclude<UserRoles>;
})();
