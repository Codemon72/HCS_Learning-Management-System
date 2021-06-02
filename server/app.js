const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
const Courses = require("./models/Courses");

const Course_Events = require("./models/Course_Events");
const Teachers = require("./models/Teachers");
const Course_Modules = require("./models/Course_Modules");
const Sessions = require("./models/Sessions");

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
// app.get('/api/courses', (req, res) => {
//   Courses.findAll({
//     include: [Teachers],
//   })
//     .then(result => res.status(200).json(result))
//     .catch((error) => {
//       console.log(error);
//       res.send(error);
//     });
// });

app.get('/api/courses', (req, res) => {
  Course_Events.findAll({ 
    include: [{ model: Sessions },
      { model: Course_Modules },
      { model: Teachers }]
    })
    .then(result => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// Add Course
app.post('/api/courses', (req, res) => {
  const { course_module_id, course_start_date, course_end_date, teacher_id, sessions } = req.body;
  // Insert into table
  Course_Events.create({
    course_module_id,
    course_start_date,
    course_end_date,
    teacher_id,
  })
    .then(result => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


// Update Course
app.put("/api/courses", (req, res) => {
  let { name, hours, start_date, end_date, teacher_id, course_id } = req.body;
  if (teacher_id === "null") {
    teacher_id = null;
  }
  Courses.update(
    { name, hours, start_date, end_date, teacher_id },
    { where: { course_id: course_id } }
  )
    .then(result => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


// Delete Course
app.delete("/api/courses/:id", (req, res) => {
  const idDeleted = parseInt(req.params.id);
  Courses.destroy({ where: { course_id: idDeleted } })
    .then(result => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// Add Sessions
app.post('/api/sessions', (req, res) => {
  const { course_module_id, course_start_date, course_end_date, teacher_id, sessions } = req.body;
  // Insert into table
  Course_Events.create({
    course_module_id,
    course_start_date,
    course_end_date,
    teacher_id,
  })
    .then(result => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));
