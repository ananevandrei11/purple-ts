class Product {
  public id: number;
  public title: string;
  public price: number;

  constructor({
    id,
    title,
    price,
  }: {
    id: number;
    title: string;
    price: number;
  }) {
    this.id = id;
    this.title = title;
    this.price = price;
  }
}

class Delivery {
  public date: Date;
  constructor(date: Date) {
    this.date = date;
  }
}

class HomeDelivery extends Delivery {
  public address: string;
  constructor(address: string) {
    super(new Date());
    this.address = address;
  }
}

class ShopDelivery extends Delivery {
  public shopId: number;

  constructor(shopId: number) {
    super(new Date());
    this.shopId = shopId;
  }
}

type DeliveryOptions = HomeDelivery | ShopDelivery;

class Cart {
  private products: Product[] = [];
  private delivery: DeliveryOptions;

  public addProduct(p: Product): void {
    this.products.push(p);
  }

  public deleteProduct(productId: number): void {
    this.products = this.products.filter(
      (p: Product) => p.id !== productId,
    );
  }

  public getTotalPrice(): number {
    const total = this.products.reduce(
      (sum: number, p: Product) => (sum += p.price),
      0,
    );
    return total;
  }

  public setDelivery(d: DeliveryOptions): void {
    this.delivery = d;
  }

  public checkout() {
    if (this.products.length === 0) {
      throw new Error('Not products');
    }

    if (!this.delivery) {
      throw new Error('Not delivery data');
    }

    return {
      success: true,
    };
  }
}

const cart = new Cart();
cart.addProduct(
  new Product({ id: 1, title: 'Cookie', price: 10 }),
);
cart.addProduct(
  new Product({ id: 2, title: 'Cake', price: 30 }),
);
cart.addProduct(
  new Product({ id: 3, title: 'Chaco', price: 15 }),
);
cart.deleteProduct(3);
cart.setDelivery(new HomeDelivery('to home'));
console.log(cart);
console.log(cart.getTotalPrice());
console.log(cart.checkout());
