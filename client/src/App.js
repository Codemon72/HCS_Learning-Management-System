import Header from './components/Header';
import Display from './components/Display';
import CourseContextProvider from './contexts/CourseContext';
import Modal from './components/Modal';
// import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {
  console.log('App rendered');

  return (
    <>
      <Header />
      <main>
        <CourseContextProvider>
          <Modal />
          <Display />
        </CourseContextProvider>
      </main>
    </>
  );
}

export default App;
