import Header from './components/Header';
import Display from './components/Display';
import Dashboard from './components/Dashboard';
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
          <div>
            <Modal />
            <Dashboard />
          </div>
          <Display />
        </CourseContextProvider>
      </main>
    </>
  );
}

export default App;
