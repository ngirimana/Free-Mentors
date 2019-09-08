import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
class Model {
  constructor(table) {
    this.table = table;
    try {
      this.pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'freeMentors',
        password: 'safari1006',
        port: 1997,
      });

      this.connect = async () => this.pool.connect();
    } catch (error) {
      console.log('DB connection erorr', error);
    }


    this.pool.on('error', (err, client) => {
      console.log('freeMentors-db-error: ', err);
    });
  }


  // CRUD - READ Operation
   select = async (columns, clause, values) => {
     await this.connect();
     try {
       let query;
       if (clause) {
         query = `SELECT ${columns} FROM ${this.table} WHERE ${clause}`;
       } else {
         query = `SELECT ${columns} FROM ${this.table}`;
       }
       const { rows } = await this.pool.query(query, values);
       return rows;
     } catch (err) {
       console.log(err);
     }
   }

   // CRUD - CREATE Operation
   async insert(columns, selector, values) {
     await this.connect();
     const query = `INSERT INTO ${this.table} (${columns}) VALUES (${selector}) returning *`;
     try {
       // console.log(query);
       const { rows } = await this.pool.query(query, values);
       return rows;
     } catch (err) {
       console.log(err);
     }
   }

   // CRUD - UPDATE Operation
   async update(columns, clause, values) {
     await this.connect();
     const query = `UPDATE ${this.table} SET ${columns} WHERE ${clause} returning *`;
     try {
       const { rows } = await this.pool.query(query, values);
       return rows[0];
     } catch (err) {
       throw err;
     }
   }

   // CRUD - DELETE Operation
   async delete(clause, values) {
     await this.connect();
     const query = `DELETE FROM ${this.table} WHERE ${clause} returning *`;
     try {
       const { rows } = await this.pool.query(query, values);
       return rows[0];
     } catch (err) {
       throw err;
     }
   }
}

export default Model;