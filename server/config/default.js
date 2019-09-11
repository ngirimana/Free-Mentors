import dotenv from 'dotenv';

dotenv.config();


const config = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV,

  databaseUrl: process.env.NODE_ENV === 'development' ? process.env.DATABASE_URL : process.env.TEST_DB_URL,
};

export default config;
