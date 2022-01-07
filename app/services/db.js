const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });
const env = process.env;

// conifguration
const config = {
  db: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
};

// database query
async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);
  connection.end();

  return results;
}

module.exports = {
  query,
};
