const Course = ({course}) => {

  console.log('Course rendered');

  return (
    <div className="course">
      <h3>Course: {course.name} </h3>
      <div>Course ID: {course.course_id}</div>
      <div>Start Date: {course.start_date}</div>
      <div>End Date: {course.end_date}</div>
      <div>Hours: {course.hours}</div>
      <div>Course: {course.course_id}</div>
      <div>Trainer: { course.Teacher != null ? course.Teacher.name : 'not determined yet'}</div>
    </div>
  )
}

export default Course
