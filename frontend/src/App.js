import {useEffect, useState} from 'react'
import Header from './components/Header'
import Display from './components/Display'
import Dashboard from './components/Dashboard'
// import { BrowserRouter as Router, Route } from "react-router-dom"



function App() {
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
    <>
      <Header />
      <main>
      <Dashboard />
      <Display />
      </main>
    </>
  );
}

export default App;
