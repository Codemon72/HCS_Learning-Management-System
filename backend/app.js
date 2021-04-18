const express = require("express");
const cors = require("cors");
const Courses = require("./models/Courses");
const Teachers = require("./models/Teachers");

// Database
const db = require('./config/database');

// Test DB (with Sequelize)
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express();

app.use(cors());

// const mariadb = require("mariadb");

// const pool = mariadb.createPool({
//   host: "127.0.0.1",
//   port: "3306",
//   user: "clemens",
//   database: "codingschool",
//   password: "",
//   connectionLimit: 5,
// });

// async function logAllCourses() {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const courses = await conn.query({
//       rowsAsArray: true,
//       sql: "SELECT name FROM courses;",
//     });
//     courses.forEach((x) => console.log(x[0]));
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) return conn.end();
//   }
// }

// logAllCourses();


// Route Home
app.get("/", (req, res) => {
  res.send("Hello from Codemon72");
});

// Route Courses
app.get("/courses", (req, res) => {
  Courses.findAll({
    include: [Teachers],
  })
    .then((courses) => {
      // res.sendStatus(200);
      res.send(courses);
    })
    .catch((err) => console.log(`Error: ${err}`));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));
