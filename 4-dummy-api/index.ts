import axios, { all } from 'axios';

const URL: string = 'https://dummyjson.com/users';

enum Roles {
  Admin = 'admin',
  Moderator = 'moderator',
  User = 'user',
}

enum Gender {
  Male = 'male',
  Female = 'female',
}

enum HairType {
  curly = 'Curly',
  straight = 'Straight',
  wavy = 'Wavy',
  kinky = 'Kinky',
}

enum Color {
  brown = 'Brown',
  green = 'Green',
  white = 'White',
  blonde = 'Blonde',
  gray = 'Gray',
  red = 'Red',
  purple = 'Purple',
  blue = 'Blue',
  black = 'Black',
}

interface IHair {
  color: Color;
  type: HairType;
}

interface IAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Icoordinates;
}

interface IBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}
interface Icrypto {
  coin: string;
  wallet: string;
  network: string;
}

interface ICompany {
  department: string;
  name: string;
  title: string;
  address: IAddress;
}

interface Icoordinates {
  lat: number;
  lng: number;
}

interface IUser {
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
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: Color;
  hair: IHair;
  ip: string;
  adress: IAddress;
  coordinates: Icoordinates;
  country: string;
  macAddress: string;
  university: string;
  bank: IBank;
  company: ICompany;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Icrypto;
  role: Roles;
}

interface IResponceSucces {
  status: number;
  data: IDataSucces;
}
interface IResponceFailed {
  status: number;
  data: IDataFailed;
}

interface IDataSucces {
  users: IUser[];
}
interface IDataFailed {
  status: number;
  statusText: string;
}

type Responces = IResponceSucces | IResponceFailed;

function isSuccessResponse(responce: Responces): responce is IResponceSucces {
  if (responce.status === 200) {
    return true;
  } else {
    return false;
  }
}

function handleApiResponse(responce: Responces): IUser[] {
  if (isSuccessResponse(responce)) {
    return responce.data.users;
  }
  console.error(responce.status);
  throw new Error(responce.data.statusText);
}

function getUserFirstName(user: IUser) {
  if (user.firstName) {
    return user.firstName;
  }
  throw new Error('User company isn`t founded');
}

async function requestToAPI(): Promise<IUser[] | undefined> {
  try {
    const responce = await axios.get<IDataSucces>(URL);
    const allUsers = handleApiResponse(responce);
    return allUsers;
  } catch (error) {
    console.error(error);
  }
}

requestToAPI();
