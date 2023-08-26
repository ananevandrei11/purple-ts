// PROXY
(function () {
  interface IPaymentDetail {
    id: number;
    sum: number;
  }

  interface IPaymentAPI {
    getPaymentDetail(id: number): IPaymentDetail | undefined;
  }

  class PaymentAPI implements IPaymentAPI {
    private data: IPaymentDetail[] = [{ id: 1, sum: 100 }];
    getPaymentDetail(id: number): IPaymentDetail | undefined {
      return this.data.find((d) => d.id === id);
    }
  }

  class PaymentAccessProxy implements IPaymentAPI {
    constructor(private api: IPaymentAPI, private userId: number) {}
    getPaymentDetail(id: number): IPaymentDetail | undefined {
      if (id === this.userId) {
        return this.api.getPaymentDetail(id);
      }
      console.log('WARNING');
      return undefined;
    }
  }

  const proxy = new PaymentAccessProxy(new PaymentAPI(), 1);
  console.log(proxy.getPaymentDetail(1));

  const proxy2 = new PaymentAccessProxy(new PaymentAPI(), 2);
  console.log(proxy2.getPaymentDetail(1));
})();

// COPMPOSITE
(function () {
  abstract class DeliveryItem {
    items: DeliveryItem[] = [];
    addItem(item: DeliveryItem): void {
      this.items.push(item);
    }
    getItemPrice(): number {
      return this.items.reduce((sum, item) => (sum += item.getPrice()), 0);
    }
    abstract getPrice(): number;
  }

  class DeliveryShopp extends DeliveryItem {
    constructor(private deliveryFee: number) {
      super();
    }
    getPrice(): number {
      return this.getItemPrice() + this.deliveryFee;
    }
  }

  class Package extends DeliveryItem {
    constructor() {
      super();
    }
    getPrice(): number {
      return this.getItemPrice();
    }
  }

  class Product extends DeliveryItem {
    constructor(private price: number) {
      super();
    }
    getPrice(): number {
      return this.price;
    }
  }

  const shop = new DeliveryShopp(100);
  shop.addItem(new Product(15000));
  const pack1 = new Package();
  pack1.addItem(new Product(250));
  pack1.addItem(new Product(350));
  shop.addItem(pack1);
  const pack2 = new Package();
  pack2.addItem(new Product(5));
  shop.addItem(pack2);
  console.log(shop.getItemPrice());
})();
