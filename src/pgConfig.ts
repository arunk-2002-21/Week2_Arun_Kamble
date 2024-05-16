import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TestOrder',
    password: 'sqlpg24',
    port: 5432,
});

 export default pool;