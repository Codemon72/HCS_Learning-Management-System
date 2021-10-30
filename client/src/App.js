import Header from './components/Header';
import Display from './components/Display';
import CourseContextProvider from './contexts/CourseContext';
import CourseModuleContextProvider from './contexts/CourseModuleContext';
import Modal from './components/Modal';
// import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {
  console.log('App rendered');

  return (
    <>
      <Header />
      <main>
        <CourseContextProvider>
        <CourseModuleContextProvider>
          <Modal />
          <Display />
        </CourseModuleContextProvider>
        </CourseContextProvider>
      </main>
    </>
  );
}

export default App;
