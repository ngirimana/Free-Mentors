import faker from 'faker';

const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password(10, true);
const users = [
  // for signup
  //* 1 valid data
  {
    first_name: 'murera',
    last_name: 'amani',
    email: 'niyo@gmail.com',
    password: 'amani444444',
    address: 'kigali,Rwanda',
    bio: ' sport',
    occupation: 'caotch',
    expertise: 'footbal',


  },
  //* * 2 valid data
  {
    first_name: 'NGIRIMANA',
    last_name: 'schadrack',
    email: 'chadrack@gmail.com',
    password: 'safari1006',
    address: 'Musanze,Rwanda',
    bio: 'I am very passionate about sport',
    occupation: 'caotch',
    expertise: 'footbal',

  },
  //* ** 3 invalid data with wrong email
  {
    first_name: 'NGIRIMANA',
    last_name: 'schadrack',
    email: 'chadrack',
    password: 'safari1006',
    address: 'Musanze,Rwanda',
    bio: 'I am very passionate about sport',
    occupation: 'caotch',
    expertise: 'footbal',
  },
  //* ***  4 user data with short password
  {
    first_name: 'murera',
    last_name: 'schadrack',
    email: 'chadrack@gmail.com',
    password: 'safari',
    address: 'Musanze,Rwanda',
    bio: 'I am very passionate about sport',
    occupation: 'caotch',
    expertise: 'footbal',

  },

  //* ***** 5 user with incomplete data

  {
    last_name: 'schadrack',
    email: 'chadrack@gmail.com',
    password: 'safari',
    address: 'Musanze,Rwanda',
    bio: 'I am very passionate about sport',
    occupation: 'caotch',
    expertise: 'footbal',


  },
  // for SignIn
  //* ****  6 correct signIn data
  {
    email: 'niyo@gmail.com',
    password: 'amani444444',
  },
  //* ***** 7 incorrect password for signin
  {
    email: 'niyo@gmail.com',
    password: 'amani4444444',
  },
  //* ****** 8 missing email
  {
    password: fakePassword,
  },
  //* ******* 9 missing password
  {
    email: fakeEmail,
  },
  //* ******** 10 wrong email
  {
    email: 'andelachalenge',
    password: fakePassword,
  },
  //* ********* 11 empty first_name
  {
    first_name: '',
    last_name: faker.name.lastName(),
    email: fakeEmail,
    password: faker.internet.password(10, true),
    address: faker.address.city(),
    bio: faker.lorem.sentence(),
    occupation: faker.name.jobTitle(),
    expertise: faker.name.jobArea(),


  },
  //* ********** 12 empty last_name
  {
    first_name: faker.name.firstName(),
    last_name: '',
    email: fakeEmail,
    password: faker.internet.password(10, true),
    address: faker.address.city(),
    bio: faker.lorem.sentence(),
    occupation: faker.name.jobTitle(),
    expertise: faker.name.jobArea(),

  },
  // ************ 13 empty password
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: fakeEmail,
    password: '',
    address: faker.address.city(),
    bio: faker.lorem.sentence(),
    occupation: faker.name.jobTitle(),
    expertise: faker.name.jobArea(),

  },
  //* ************ 14 empty address
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.name.firstName(),
    password: fakePassword,
    address: '',
    bio: faker.lorem.sentences(),
    occupation: faker.name.jobTitle(),
    expertise: faker.name.jobArea(),

  },
  //* ************* 15 empty bio
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.name.firstName(),
    password: fakePassword,
    address: faker.address.city(),
    bio: '',
    occupation: faker.name.jobTitle(),
    expertise: faker.name.jobArea(),

  },
  //* ************* 16 empty occupatiion
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.name.firstName(),
    password: fakePassword,
    address: faker.address.city(),
    bio: faker.lorem.sentences(),
    occupation: '',
    expertise: faker.name.jobArea(),

  },
  //* ************* 17 empty expertise
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.name.firstName(),
    password: fakePassword,
    address: faker.address.city(),
    bio: faker.lorem.sentences(),
    occupation: faker.name.jobTitle(),
    expertise: '',

  },
  {
    first_name: 'patrick',
    last_name: 'ishimwe',
    email: 'ishimwe@gmail.com',
    password: 'rwanda1234',
    address: 'kigali,Rwanda',
    bio: 'I am very passionate about sport',
    occupation: 'caotch',
    expertise: 'footbal',


  },

];
export default users;
