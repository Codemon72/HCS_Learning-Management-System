import Header from './components/Header'
import Display from './components/Display'
import Dashboard from './components/Dashboard'
// import { BrowserRouter as Router, Route } from "react-router-dom"



function App() {

  console.log('App rendered');

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
