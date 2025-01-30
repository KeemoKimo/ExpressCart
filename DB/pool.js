const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'ExpressCart',
    password: '29102006$Va',
    port: 5432,
});

module.exports = pool;