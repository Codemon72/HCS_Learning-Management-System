import Course from './Course'
import Loader from "./Loader";
import { useContext } from 'react'
import { CourseContext } from '../contexts/CourseContext';

const Display = () => {

  console.log('Display rendered');

  const { courses, error, isPending } = useContext(CourseContext);

  const handleDelete = (course_id) => {
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
