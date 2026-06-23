const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root123",
  database: process.env.DB_NAME || "cruddb",
});

setTimeout(() => {
  db.connect((err) => {
    if (err) {
      console.log("Database Connection Failed");
      console.log(err);
      return;
    }

    console.log("MySQL Connected");
  });
}, 10000);

module.exports = db;