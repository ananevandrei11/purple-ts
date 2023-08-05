(function () {
  function runTransaction(transaction: {
    fromTo: [string, string];
  }) {
    console.log(transaction);
  }

  type GetFirstArg<T> = T extends (
    first: infer First,
    ...args: any[]
  ) => any
    ? First
    : never;

  const transaction: GetFirstArg<typeof runTransaction> = {
    fromTo: ['1', '2'],
  };

  runTransaction(transaction);
})();
