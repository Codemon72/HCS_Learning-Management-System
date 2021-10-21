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

// COURSES
// Read Courses
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
    sessions
  }, {
    include : [ Sessions ]
  })
    .then(result => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// Update Course
app.put("/api/course_events", (req, res) => {
  let { course_event_id, course_module_id, course_start_date, course_end_date, teacher_id } = req.body;
  if (teacher_id === "null") {
    teacher_id = null;
  }
  Course_Events.update(
    { course_module_id, course_start_date, course_end_date, teacher_id },
    { where: { course_event_id: course_event_id } }
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
  Course_Events.destroy({ where: { course_event_id: idDeleted } })
    .then(result => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


// SESSIONS
// Add Sessions
app.post('/api/sessions', (req, res) => {
  Sessions.bulkCreate(req.body)
    .then(result => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// Delete Session
app.delete("/api/sessions/:id", (req, res) => {
  const idDeleted = parseInt(req.params.id);
  Sessions.destroy({ where: { session_id: idDeleted } })
    .then(result => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));
