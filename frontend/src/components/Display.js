import Course from './Course'
import Loader from "./Loader";
import { useEffect, useState } from 'react'

const Display = () => {

  console.log('Display rendered');

  const [courses, setCourses] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const URLAllCourseData = 'http://localhost:4000/courses'

  const fetchCourseData = async () => {
    try {
      const response = await fetch(URLAllCourseData);
      if (!response.ok) { // error from server (e.g. invalid API endpoint)
        throw Error(response.statusText);
      }
      const data = await response.json();
      setCourses(data);
      setIsPending(false);
      setError(null);
    } catch (error) { // auto catches network / connection error
      setIsPending(false);
      setError(error.message);
    }
    // setProducts(data.map((obj) => ({ ...obj, selected: true })));
  };

  // Fetch Course Data on first Rendering
  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <div className="display">
      Display <br/><br/><br/>
      { error && <div>Error: &nbsp; { error }</div> }
      { isPending && <Loader /> }
      { courses && (
        courses.map((course) => {
            return (
              <Course
                key = {course.course_id}
                course = {course}
              />
            );
          })
      )}
    </div>
  )
}

export default Display
