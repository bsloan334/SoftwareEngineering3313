const { Client, Pool } = require("pg");

const connectionString = "35.196.154.95";

const pool = new Pool();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
