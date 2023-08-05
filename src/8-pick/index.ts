(function () {
  const user = {
    name: 'Name',
    lastName: 'Last Name',
    age: 25,
  };

  type key = string | number | symbol;

  function pickObjKeys<T, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Pick<T, K> {
    /*
    const picked = {} as Pick<T, K>;
    keys.forEach((key) => {
      picked[key] = obj[key];
    });
    return picked;
  */
    return keys.reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Pick<T, K>);
  }

  const test = pickObjKeys(user, ['name', 'lastName']);
  console.log(test);
})();
