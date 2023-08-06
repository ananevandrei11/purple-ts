(function () {
  interface PaymentPersistent {
    id: number;
    sum: number;
    from: string;
    to: string;
  }

  type PaymentWithoutID = Omit<PaymentPersistent, 'id'>;
  type PaymentRequisites = Pick<
    PaymentPersistent,
    'from' | 'to'
  >;

  type ExtractExample = Extract<
    'from' | 'to' | PaymentPersistent,
    string
  >;
  let extract: ExtractExample = 'from';

  type ExcludeExample = Exclude<PaymentPersistent, string>;
  const exclude: ExcludeExample = {
    from: '',
    to: '',
    id: 1,
    sum: 2,
  };
  console.log(exclude);
})();
