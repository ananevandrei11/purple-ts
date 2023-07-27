"use strict";
/*
const arr: [string, number] = ['a', 1];
const arrRest: [string, number, ...boolean[]] = [
  'a',
  1,
  true,
  false,
];

const skill: readonly [number, string] = [1, 'Dev'];
const skills: readonly string[] = ['DevOps', 'Dev'];
const skills: ReadonlyArray<string> = ['DevOps', 'Dev'];
enum StatusCode {
  draft = 'draft',
  published = 'published',
  deleted = 'deleted',
}

const enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

const user = Roles.USER;

type RequestFaqs = {
  topicId: number;
  status?: StatusCode;
};

type ResponseFaqs = {
  question: string;
  answer: string;
  tags: string[];
  likes: number;
  status: StatusCode;
};

async function getFaqs(
  req: RequestFaqs,
): Promise<ResponseFaqs[]> {
  const res = await fetch('/faqs', {
    method: 'POST',
    body: JSON.stringify(req),
  });
  const data = await res.json();
  return data;
}

const a = getFaqs({
  topicId: 1,
  status: StatusCode.published,
});

a.then((res) => console.log(res[0].status));

// UNION
function logError(err: string | string[]): string {
  let errors = '';
  if (Array.isArray(err)) {
    err.forEach((e) => (errors += e));
    return errors;
  } else {
    return err;
  }
}

function logObject(obj: { a: number } | { b: number }) {
  if ('a' in obj) {
    console.log(obj.a);
  } else {
    console.log(obj.b);
  }
}

function logMultipleIds(
  a: string | number,
  b: string | boolean,
) {
  if (typeof a === typeof b) {
    console.log('as string');
  } else {
    console.log('as other');
  }
}

// Literals types & Type Aliases
type httpMethod = 'GET' | 'POST'; // alias
async function fetchWithAuth(
  url: string,
  method: httpMethod,
): Promise<string> {
  try {
    const res = await fetch(url, {
      method,
    });
    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      // not correct e = e as Error;
      return e.message;
    }
    return String(e);
  }
}

let methodError = 'POST';
fetchWithAuth('', methodError); // with error types

const methodSuccess = 'POST';
fetchWithAuth('', methodSuccess); // without error types

// Type Aliases
type User = {
  name: string;
  age: number;
  skills: string[];
};

type Role = {
  id: number;
};

type UserWithRole = User & Role;

let someUser: User = {
  name: 'name',
  age: 33,
  skills: ['DevOps', 'Dev'],
};

let someUserWithId: UserWithRole = {
  name: 'name',
  age: 33,
  skills: ['DevOps', 'Dev'],
  id: 1,
};

function multiply(f: number, s?: number) {
  if (!s) {
    return f * f;
  }
  return f * s;
}

// Unknown

let input: unknown;

input = 3;
input = 'string';

// let result: string = input;

function run(i: unknown) {
  if (typeof i === 'number') {
    return ++i;
  }

  if (typeof i === 'string') {
    return i.toLocaleLowerCase();
  }
}

run(input);

// Never
function generateError(message: string): never {
  throw new Error(message);
  // newer return something
}

type PaymentAction = 'refund' | 'checkout';

function processAction(action: PaymentAction) {
  switch (action) {
    case 'refund':
      console.log('refund');
      break;
    case 'checkout':
      console.log('checkout');
      break;
    default:
      const _: never = action;
      generateError('Error. Nothing action.');
  }
}

function isString(x: string | number): boolean | never {
  if (typeof x === 'string') {
    return true;
  } else if (typeof x === 'number') {
    return false;
  }
  generateError('Error. No string, no number');
}

const nullish: null = null;

let aNumber = 5;
let bString: string = aNumber.toString();
let eString: string = new String(aNumber).valueOf();

interface UserType {
  name: string;
  email: string;
  login: string;
}

const userVaisya = {
  name: 'Vaisya',
  email: 'vasya@mail.com',
  login: 'vaisya123',
} as UserType;

interface AdminType {
  name: string;
  role: number;
}

const adminVaisya: AdminType = {
  ...userVaisya,
  role: 1,
};

not correct

function userToAdmin(user: UserType): AdminType {
  return {
    name: user.name,
    role: 1,
  };
}

const adminVaisya = userToAdmin(userVaisya);


interface User {
  name: string;
  email: string;
  login: string;
}

const user: User = {
  name: 'Vaisya',
  email: 'vasya@mail.com',
  login: 'vaisya123',
};

interface Admin {
  name: string;
  role: number;
}

function logId(id: number | string) {
  if (isString(id)) {
    console.log(id);
  } else {
    console.log(id);
  }
  id;
}

// Type Guard: [v] is [type]
function isString(x: string | number): x is string {
  return typeof x === 'string';
}

function isAdmin(user: User | Admin): user is Admin {
  return 'role' in user;
}

function isAdminAlternative(
  user: User | Admin,
): user is Admin {
  return (user as Admin).role !== undefined;
}

function setRoleZero(user: User | Admin) {
  if (isAdmin(user)) {
    user.role = 0;
  } else {
    throw new Error('User not Admin');
  }
}
*/ 
