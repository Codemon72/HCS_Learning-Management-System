import { useState, useEffect, createContext } from 'react';

export const CourseModuleContext = createContext();

export const CourseModuleContextProvider = ({ children }) => {

  console.log('CourseModuleContextProvider rendered');

  const [courseModules, setCourseModules] = useState([]);

  const URLAllCourseModulesData = 'http://localhost:4000/api/course_modules'

  const fetchCourseModulesData = async () => {
    try {
      const response = await fetch(URLAllCourseModulesData);
      if (!response.ok) { // errors from server
        throw Error(response.statusText);
      }
      const data = await response.json();
      setCourseModules(data);
    } catch (error) { // errors from network / connection
      console.log(error.message);
    }
  };

  // Fetch Array of Course Modules on first Rendering
  useEffect(() => {
    fetchCourseModulesData();
  }, []);
  
  return (
    <CourseModuleContext.Provider
      value={{
        courseModules,
        fetchCourseModulesData
      }}>

        { children }

    </CourseModuleContext.Provider>
  )
}

export default CourseModuleContextProvider;
