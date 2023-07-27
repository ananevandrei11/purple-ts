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

// -----------------------------------
// OVERLOAD
class User {
  skills: string[] = [];

  addSkill(skill: string): void;
  addSkill(skills: string[]): void;
  addSkill(skillOrSkills: string | string[]): void {
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

// -----------------------------------
// Setter and Getter
class User {
  _login: string;
  password: string;
  createdAt: Date;

  // not async only sync
  set login(login: string | number) {
    this._login = 'user-' + login;
    this.createdAt = new Date();
  }

  // not async only sync
  get login() {
    return this._login || 'NoLogin';
  }
}

const user = new User();
user.login = 'MyLogin';
console.log(user);
console.log(user.login);

// -----------------------------------
// Implements (auto)
interface ILogger {
  log(...args: any[]): void;
  error(...args: any[]): void;
}

class Logger implements ILogger {
  log(...args: any[]): void {
    console.log(args);
  }
  error(...args: any[]): void {
    throw new Error(...args);
  }
}

interface IPayable {
  pay(paymentId: number): void;
  price?: number;
}

interface IDeletable {
  delete(): void;
}

class User implements IPayable, IDeletable {
  delete(): void {
    console.log('delete');
  }
  // overload in implements
  pay(paymentId: number | string): void {
    console.log(paymentId);
  }
  price?: number | undefined;
}

console.log(new User().pay);


// -----------------------------------
// Extends
type PaymentStatus = 'new' | 'paid';

class Payment {
  id: number;
  status: PaymentStatus = 'new';

  constructor(id: number) {
    this.id = id;
  }

  pay() {
    this.status = 'paid';
  }
}

class PersistedPayment extends Payment {
  dataBaseId: number;
  paidAt: Date;

  constructor() {
    const id = Math.random();
    super(id);
  }

  save() {
    // save to DB
  }

  override pay(date?: Date) {
    super.pay();
    if (date) {
      this.paidAt = new Date();
    }
  }
}

const payTest = new PersistedPayment();
payTest.pay(new Date());
console.log(payTest);

class User {
  name: string = 'user';

  constructor() {
    console.log(this.name);
  }
}

class Admin extends User {
  name: string = 'admin';

  constructor() {
    super();
    console.log(this.name);
  }
}

class HttpError extends Error {
  code: number;
  constructor(message: string, code?: number) {
    super(message);
    this.code = code ?? 500;
  }
}

// ------------------------
// Extend (for one area domain) and Composition (for diff area domain)
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Users extends Array<User> {
  // it is extends
  searchByName(name: string) {
    return this.filter((u) => u.name === name);
  }

  override toString(): string {
    return this.map((u) => u.name).join(', ');
  }
}

const users = new Users();
users.push(new User('Peter'));
console.log(users.toString());

class UserList {
  // it is composition
  users: User[];

  push(u: User) {
    this.users.push(u);
  }
}

class Payment {
  date: Date;
}

class UserWithPayment extends Payment {
  // it is extends - mix different domains
  userId: number;
  name: string;
}

class UserWithPayment2 {
  // it is composition
  user: User;
  payment: Payment;

  constructor(user: User, payment: Payment) {
    this.payment = payment;
    this.user = user;
  }
}

// ------------------------
// Visibility of Properties
class Vehicle {
  public make: string;
  private damages: string[];
  private _model: string; // only this class
  protected run: number; // for child classes
  #price: number; // private too

  // one method
  set model(m: string) {
    this._model = m;
  }

  get model() {
    return this._model;
  }

  // other method
  addDamage(d: string) {
    this.damages.push(d);
  }

  private getDamage() {
    return this.damages;
  }

  isPriceVehicle(v: Vehicle) {
    return this.#price === v.#price;
  }
}

class EuroTrack extends Vehicle {
  setRun(km: number) {
    this.run = km / 0.62; // allowed
    // this.damages - error, not allowed
  }
}

new Vehicle().make = 'asd';

// ------------------------
// Static features
class UserService {
  static db: any;

  static getUser(id: number) {
    return UserService.db.findById(id);
  }

  create() {
    UserService.db;
  }

  static {
    UserService.db = 'string';
  }
}

UserService.db;
UserService.getUser(1);
const instService = new UserService();
instService.create();

//--------------------
// Context this
class Payment {
    private data: Date = new Date();

    getDate(this: Payment) {
        return this.data;
    }

    getDateArrow = () => {
        return this.data;
    };
}

const p = new Payment();

const user = {
    id: 1,
    paymentDate: p.getDate.bind(p),
    paymentDateArrow: p.getDateArrow,
};

user.paymentDate();
user.paymentDateArrow();

class UserBuilder {
    name: string;

    setName(name: string): this {
        this.name = name;
        return this;
    }

    isAdmin(): this is AdminBuilder {
        return this instanceof AdminBuilder;
    }
}

class AdminBuilder extends UserBuilder {
    roles: string[];
}

const resUB = new UserBuilder().setName('Vasa');
const resAB = new AdminBuilder().setName('Vasa');

let userB: UserBuilder | AdminBuilder = new UserBuilder();

if (userB.isAdmin()) {
  console.log(userB);
} else {
  console.log(userB);
}
*/

// --------------------------
// Abstract Class
abstract class Controller {
  abstract handle(req: any): void;

  handleWithLogs(req: any) {
    console.log('start');
    this.handle(req);
    console.log('end');
  }
}

class UserController extends Controller {
  handle(req: any): void {
    console.log(req);
  }
}

const cc = new UserController();
abstract class Logger {
  abstract log(m: string): void;

  printDate(d: Date): void {
    this.log(d.toString());
  }
}

class UserLogger extends Logger {
  log(m: string): void {
    console.log(m);
  }

  logWithDate(d: Date) {
    this.printDate(d);
    this.log('message');
  }
}

const bb = new UserLogger();
bb.logWithDate(new Date());
