(function () {
  const objA = { a: 1, b: 'b', v: '2' };
  const objB = { a: 2, c: true };

  function difference<A extends object, B extends object>(
    objA: A,
    objB: B,
  ) {
    const diffObj = Object.keys(objA).reduce((acc, key) => {
      if (!objB.hasOwnProperty(key)) {
        acc[key as keyof A] = objA[key as keyof A];
      }
      return acc;
    }, {} as Partial<A>);

    return diffObj as Omit<A, keyof B>;
  }

  const diffAB = difference(objA, objB);
  console.log(diffAB.b);
  console.log(diffAB.v);
  const diffBA = difference(objB, objA);
  console.log(diffBA.c);
})();
