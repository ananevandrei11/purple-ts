import axios from 'axios';

enum Gender {
  Male = 'male',
  Female = 'female',
}

type BloodGroup =
  | 'A−'
  | 'A+'
  | 'B+'
  | 'B-'
  | 'O+'
  | 'O-'
  | 'AB-';

interface Address {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  postalCode: string;
  state: string;
}

interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Hair {
  color: string;
  type: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: BloodGroup;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
}

type Users = User[];

async function getUsers() {
  const res = await axios.get<Users>(
    'https://dummyjson.com/users',
  );
  const users = res.data;
  console.log(users[0].address);
}

getUsers();
