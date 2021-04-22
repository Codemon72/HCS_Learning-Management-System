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

// Route Home
app.get('/', (req, res) => {
  res.send('Hello from Codemon72');
});

// Route Courses
app.get('/courses', (req, res) => {
  Courses.findAll({
    include: [Teachers],
  })
    .then((courses) => {
      res.send(courses);
    })
    .catch((err) => console.log(`Error: ${err}`));
});

// Add a Course
app.post('/courses/add', (req, res) => {
  let data = JSON.parse(req.body);
  console.log(data)
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));
