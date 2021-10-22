import Header from './components/Header';
import Display from './components/Display';
import Dashboard from './components/Dashboard';
import CourseContextProvider from './contexts/CourseContext';
import AddCourse from './components/AddCourse';
// import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {
  console.log('App rendered');

  return (
    <>
      <Header />
      <main>
        <CourseContextProvider>
          <div>
            <AddCourse />
            <Dashboard />
          </div>
          <Display />
        </CourseContextProvider>
      </main>
    </>
  );
}

export default App;
