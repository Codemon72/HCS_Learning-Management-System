import Course from './Course'
import Loader from "./Loader";
import { useContext } from 'react'
import { CourseContext } from '../contexts/CourseContext';

const Display = () => {

  console.log('Display rendered');

  const { courses, error, isPending, fetchCourseData } = useContext(CourseContext);

  const handleDelete = (course_id) => {
    fetch('http://localhost:4000/api/courses/delete/' + course_id, { method: 'DELETE' })
    .then(response => console.log(response))
    .then(fetchCourseData())
    .catch(error => console.log('error deleting course: ' + error));
    console.log(course_id);
  }

  return (
    <div className="display">

      <h3>Display</h3><br/><br/>

      { error && <div>Error: &nbsp; { error }</div> }
      { isPending && <Loader /> }
      { courses && (
        courses.map((course) => {
            return (
              <Course
                key = {course.course_id}
                course = {course}
                handleDelete = {handleDelete}
              />
            );
          })
      )}
    </div>
  )
}

export default Display
