import Course from './Course'
import Loader from "./Loader";
import { useEffect, useState } from 'react'

const Display = () => {

  console.log('Display rendered');

  let [courses, setCourses] = useState([]);

  const URLAllCourseData = 'http://localhost:4000/coursess'

  const fetchCourseData = async () => {
    try {
      const response = await fetch(URLAllCourseData);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.log(error)
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
        <Loader />

    </div>
  )
}

export default Display
