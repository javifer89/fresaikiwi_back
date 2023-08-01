// requerir la libreria
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.HOSTDB, //este es el local host
  user: process.env.USERDB,
  password: process.env.PASSDB,
  port: process.env.PORTDB,
  database: process.env.DBNAME,
});

//12 necesito que el pool este disponible desde cualquier punto de mi app. creo una variable glogal para toda la app
global.db = pool.promise(); //db es el nombre de mi variable
