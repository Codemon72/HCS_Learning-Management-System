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
app.get('/api/courses', (req, res) => {
  Courses.findAll({
    include: [Teachers],
  })
    .then((courses) => {res.send(courses)})
    .catch((err) => console.log(`Error: ${err}`));
});

// Add Course
app.post('/api/courses/add', (req, res) => {
  const { name, start_date, end_date, hours, teacher_id } = req.body;
  // Insert into table
  Courses.create({
    name,
    hours,
    start_date,
    end_date,
    teacher_id,
  })
    .then(result => {res.status(200).json(result)})
    .catch((err) => console.log(err));
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
    .then((result) => {
      if(!result) {
        res.status(500).json({
          message: "Error -> Can not update course with id = " + course_id,
          error: "Can NOT Update",
        });
      }
      res.status(200).json(result);
      })
    .catch((error) => {
      res.status(500).json({
        message: "Error -> Can not update course with id = " + course_id,
        error: error.message
      });
    });
});

// Delete Course
app.delete("/api/courses/delete/:id", (req, res) => {
  const idDeleted = parseInt(req.params.id);
  Courses.destroy({ where: { course_id: idDeleted } })
    .then(res.send(course_id))
    .catch((err) => console.log(err));
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));
