import Course from './Course'
import Loader from "./Loader";
import { useEffect, useState } from 'react'

const Display = () => {

  console.log('Display rendered');

  let [courses, setCourses] = useState([]);

  const URLAllCourseData = 'http://localhost:4000/courses'

  const fetchCourseData = async () => {
    const res = await fetch(URLAllCourseData);
    if (!res.ok) {
      throw Error('could not fetch data from that endpoint');
    }
    const data = await res.json();
    const error = await 
    setCourses(data);
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
