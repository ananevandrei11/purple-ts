"use strict";
class Product {
    constructor({ id, title, price, }) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}
class Delivery {
    constructor(date) {
        this.date = date;
    }
}
class HomeDelivery extends Delivery {
    constructor(address) {
        super(new Date());
        this.address = address;
    }
}
class ShopDelivery extends Delivery {
    constructor(shopId) {
        super(new Date());
        this.shopId = shopId;
    }
}
class Cart {
    constructor() {
        this.products = [];
    }
    addProduct(p) {
        this.products.push(p);
    }
    deleteProduct(productId) {
        this.products = this.products.filter((p) => p.id !== productId);
    }
    getTotalPrice() {
        const total = this.products.reduce((sum, p) => (sum += p.price), 0);
        return total;
    }
    setDelivery(d) {
        this.delivery = d;
    }
    checkout() {
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
cart.addProduct(new Product({ id: 1, title: 'Cookie', price: 10 }));
cart.addProduct(new Product({ id: 2, title: 'Cake', price: 30 }));
cart.addProduct(new Product({ id: 3, title: 'Chaco', price: 15 }));
cart.deleteProduct(3);
cart.setDelivery(new HomeDelivery('to home'));
console.log(cart);
console.log(cart.getTotalPrice());
console.log(cart.checkout());
