const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
const Courses = require("./models/Courses");
const Teachers = require("./models/Teachers");

// Database
const db = require('./config/database');
const { response } = require("express");

// Test DB (with Sequelize)
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express();

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(cors(corsOptions));

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
  const { name, start_date, end_date, hours, teacher_id } = req.body;
  // Insert into table
  Courses.create({
    name,
    hours,
    start_date,
    end_date,
    teacher_id,
  })
    .then(result => {    
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
});

// Delete a Course
app.delete("/courses/delete/:id", (req, res) => {
  const idDeleted = parseInt(req.params.id);
  Courses.destroy({ where: { course_id: idDeleted } })
    .then(res.send(course_id))
    .catch((err) => console.log(err));
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));
