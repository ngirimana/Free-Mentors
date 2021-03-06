import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => {
  console.log(err);
});

const createTables = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
  id SERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  bio VARCHAR NOT NULL,
  occupation VARCHAR NOT NULL,
  expertise VARCHAR NOT NULL,
  is_mentor BOOLEAN NOT NULL DEFAULT false,
  is_admin BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO users (
     first_name, last_name, email, password,address,bio,occupation,expertise,is_mentor,is_admin
    ) VALUES (
         'Ngirimana',
         'Schadrack',
        'safari@gmail.com',
        '$2b$10$Bg3o62jmwLyfDWKD3DdiduNuw0r1ZhN5RdFNdDQuiKJtXNJPuN9CW',
        'kigali',
        'dfbhsbdfhbs ',
        'sosftware engineer',
        'python',
        false,
        true
);
DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions(
  session_id SERIAL NOT NULL PRIMARY KEY,
  mentor_id INTEGER NOT NULL,
  questions VARCHAR NOT NULL,
  mentee_id INTEGER NOT NULL,
  mentee_email VARCHAR NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'pending'
);

`);

export default createTables;
