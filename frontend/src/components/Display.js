import Course from './Course'
import { useEffect, useState } from 'react'

const Display = () => {

  let [courses, setCourses] = useState([]);

  const URLAllCourseData = 'http://localhost:4000/courses'

  const fetchCourseData = async () => {
    const res = await fetch(URLAllCourseData);
    const data = await res.json();
    setCourses(data);
    console.log(data);
    // setProducts(data.map((obj) => ({ ...obj, selected: true })));
  };

  // fetch course data on first rendering
  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <div className="display">
      This is Display. <br/><br/><br/>
      {courses.map((course) => {
          return (
            <Course
              // key={course_id}
              course={course}
            />
          );
        })}
    </div>
  )
}

export default Display
