import { useState, useEffect, createContext } from 'react';

export const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {

  console.log('CourseContextProvider rendered');

  const [courses, setCourses] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const URLAllCourseData = 'http://localhost:4000/api/courses'

  const fetchCourseData = async () => {
    try {
      const response = await fetch(URLAllCourseData);
      if (!response.ok) { // errors from server
        throw Error(response.statusText);
      }
      const data = await response.json();
      console.log(data)
      setCourses(data);
      setIsPending(false);
      setError(null);
    } catch (error) { // errors from network / connection
      setIsPending(false);
      setError(error.message);
    }
  };

  // Fetch Course Data on first Rendering
  useEffect(() => {
    fetchCourseData();
  }, []);
  
  return (
    <CourseContext.Provider
      value={{
        courses,
        error,
        isPending,
        fetchCourseData
      }}>

        { children }

    </CourseContext.Provider>
  )
}

export default CourseContextProvider;
