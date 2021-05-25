import Course from './Course'
import Loader from "./Loader";
import { useContext } from 'react'
import { CourseContext } from '../contexts/CourseContext';

const Display = () => {

  console.log('Display rendered');

  const { courseEvents, error, isPending, fetchCourseData } = useContext(CourseContext);

  const deleteCourseFromDB = (course_id) => {
    const options = {
      method: 'DELETE'
    };
    return fetch('http://localhost:4000/api/courses/' + course_id, options)
            .then(res => { 
              if (!res.ok) { // errors from server
                throw Error(res.statusText);
              }
              return res.json();
            });
  };

  const handleDelete = (course_id) => {
    deleteCourseFromDB(course_id)
      .then(data => {console.log('course deleted: ', data)})
      .then(() => fetchCourseData())
      .catch(error => console.log(error));
  };

  return (
    <div className="display">

      <h3>Display</h3><br/><br/>

      { error && <div>Error: &nbsp; { error }</div> }
      { isPending && <Loader /> }
      { courseEvents && (
        courseEvents.map((course) => {
            return (
              <Course
                key = {course.course_event_id}
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
