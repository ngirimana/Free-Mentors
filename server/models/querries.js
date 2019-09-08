import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => {
  console.log(err);
});

const createTable = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
  id SERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  address  VARCHAR NOT NULL,
  bio VARCHAR NOT NULL,
  occupation  NOT NULL,
  expertise  NOT NULL,
  is_mentor BOOLEAN NOT NULL DEFAULT false,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  );
  INSERT INTO users (
    first_name, last_name, email, password,address,bio,occupation,expertise,is_mentor,is_admin
   ) VALUES (
        'safari',
        'ngirimana',
        'chadrack@gmail.com',
        '$2b$10$9DhD.e2mZV/Nma8SEOk.g.F9IJJ17N7IICSeYB8ACrUxXQB20lMjG',
        'Kigali',
        'hgfa bsfjjafdjwhsd vhv hvbsdvbhebasjdvbjasbvjbjasvb dsvbajsbvdjb jvbjsbv'
        'Software engineers',
        'Nodejs'
        false
        true
);
  DROP TABLE IF EXISTS sessions CASCADE;
  CREATE TABLE sessions(
    sessionId SERIAL PRIMARY KEY,
    menteeId INT NOT NULL,
    mentorId INT NOT NULL,
    questions VARCHAR(500) NOT NULL,
    mentorEmail  VARCHAR(100) NOT NULL,
    menteeEmail  VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
);
DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews(
    reviewId SERIAL PRIMARY KEY,
    sessionId INT NOT NULL,
    menteeId INT NOT NULL,
    mentorId INT NOT NULL,
    score INT NOT NULL,
    remark VARCHAR(500) NOT NULL,
`);
export default createTable;
