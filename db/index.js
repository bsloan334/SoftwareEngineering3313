const { Client, Pool } = require('pg');

const connectionString = 'software-engineering-test.c0fowlgl6hwa.us-west-2.rds.amazonaws.com';

const pool = new Pool();

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}

