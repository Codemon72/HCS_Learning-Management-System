import {useEffect} from 'react'
import Header from './components/Header'
import Display from './components/Display'
import Dashboard from './components/Dashboard'



function App() {
  
  useEffect(() => {
    console.log('Component mounted. ')
  }, [])

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
