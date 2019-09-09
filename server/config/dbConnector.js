import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
class ConnectToDb {
  constructor(table) {
    this.table = table;
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    this.pool.on('error', (err, client) => {
      console.log('Wayfarer-db-error: ', err);
    });
  }
}

export default new ConnectToDb();
