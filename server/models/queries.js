import dotenv from 'dotenv';
import dbConnection from './db';

dotenv.config();

class Model {
  constructor(table) {
    this.table = table;
    this.connection = dbConnection;
    this.initializeDB();
  }

  async initializeDB() {
    await this.connection.connect();
  }

  async select(columns, clause, values) {
    try {
      let query;
      if (clause) {
        query = `SELECT ${columns} FROM ${this.table} WHERE ${clause}`;
      } else {
        query = `SELECT ${columns} FROM ${this.table}`;
      }
      const { rows } = await this.connection.pool.query(query, values);
      return rows;
    } catch (err) {
      console.log(err);
    }
  }

  async insert(columns, selector, values) {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${selector}) returning *`;
    try {
      const { rows } = await this.connection.pool.query(query, values);
      return rows;
    } catch (err) {
      console.log(err);
    }
  }

  async update(columns, clause, values) {
    const query = `UPDATE ${this.table} SET ${columns} WHERE ${clause} returning *`;
    try {
      const { rows } = await this.connection.pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async delete(clause, values) {
    const query = `DELETE FROM ${this.table} WHERE ${clause} returning *`;
    try {
      const { rows } = await this.connection.pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default Model;
