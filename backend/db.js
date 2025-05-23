const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: "localhost",
  user: "vaishnavp1",
  password: "Vai@1234",
  database: "blog_app"
});
conn.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected!');
});
module.exports = conn;
