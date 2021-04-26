import { useState, useEffect, createContext } from 'react';

export const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {

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
