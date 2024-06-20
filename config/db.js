const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tienda',
    password: '1903',
    port: 5432,
});

module.exports = pool;