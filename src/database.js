import mysql from "mysql2/promise";
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from "./config.js";

const pool = mysql.createPool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});

const connecToDtabase = async () => {
  try {
    const conn = await pool.getConnection();
    console.log("! Conectado a la base de datos !");
    conn.release();
  } catch (error) {
    console.log("El error de coneccion base de datos es: ", error);
  }
};
connecToDtabase();

export default pool;
