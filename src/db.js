const mysql = require('mysql2/promise');

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Melnick34?',
  database: 'company_db'
};

async function query(sql, params) {
  const connection = await mysql.createConnection(connectionConfig);
  const [results] = await connection.execute(sql, params);
  connection.end();
  return results;
}

module.exports = { query };
