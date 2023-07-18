"use strict";
/*
class User {
  name: string;
  age: number;

  // overload in TypeScript
  constructor();
  constructor(name: string);
  constructor(age: number);
  constructor(name: string, age: number);
  constructor(ageOrName?: string | number, age?: number) {
    if (typeof ageOrName === 'string') {
      this.name = ageOrName;
    }
    if (typeof ageOrName === 'number') {
      this.age = ageOrName;
    }
    if (typeof age === 'number') {
      this.age = age;
    }
  }
}

const user = new User('Vova');
const user2 = new User();
const user3 = new User(33);
const user4 = new User('Vova', 33);


enum PaymentStatus {
  Holded,
  Processed,
  Reversed,
}

class Payment {
  id: number;
  status: PaymentStatus = PaymentStatus.Holded;
  createdAt: Date = new Date();
  updatedAt: Date;

  constructor(id: number) {
    this.id = id;
  }

  getPaymentLifeTime(): number {
    return new Date().getTime() - this.createdAt.getTime();
  }

  unholdPayment(): void {
    if (this.status === PaymentStatus.Processed) {
      throw new Error('Payment can not refund');
    }
    this.status = PaymentStatus.Reversed;
    this.updatedAt = new Date();
  }
}

const payment = new Payment(1);
payment.unholdPayment();
const time = payment.getPaymentLifeTime();
*/
class User {
    constructor() {
        this.skills = [];
    }
    addSkill(skillOrSkills) {
        if (typeof skillOrSkills === 'string') {
            this.skills.push(skillOrSkills);
        }
        if (Array.isArray(skillOrSkills)) {
            this.skills = this.skills.concat(skillOrSkills);
        }
    }
}
const user = new User();
user.addSkill(['devops', 'backend']);
user.addSkill('develop');
console.log(user);
