import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
class Connector {
  constructor() {
    try {
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      this.connect = async () => this.pool.connect();
    } catch (error) {
      console.log('DB connection erorr', error);
    }
    this.pool.on('error', (err, client) => {
      console.log('freeMentors-db-error: ', err);
    });
  }
}

export default new Connector();
