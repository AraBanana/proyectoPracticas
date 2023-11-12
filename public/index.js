const { Pool } = require('pg');

const config = {
  user: 'postgres',
  host: 'localhost',
  password: '',
  database: 'domas'
};

const pool = new Pool(config);

const getUsers = async () => {
  try {
    const res = await pool.query('SELECT * FROM usuarios');
    console.log(res.rows);
  } catch (error) {
    console.error('Error executing query:', error.message);
  } finally {
    pool.end(); // Cierra la conexión después de la ejecución de la consulta (opcional)
  }
};

getUsers();
