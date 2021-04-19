const Course = ({course}) => {
  return (
    <div className="course">
      <h3>Course: {course !== undefined ? course.name : '' } </h3>
      {/* { course.name } */}
    </div>
  )
}

export default Course
