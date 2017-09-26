const { Client } = require('pg');

const host = process.env.DATABASE_URL || 'software-engineering-test.c0fowlgl6hwa.us-west-2.rds.amazonaws.com';
const port = 5432;
const database = 'swe3313';
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PWD;

const client = new Client({
    user,
    host,
    database,
    password,
    port,
});
client.connect();
const query = client.query(
    'SELECT * FROM pg_tables', (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log('here')
            console.log(res)
        }
    });

client.end()
