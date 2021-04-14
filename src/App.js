import {useEffect} from 'react'
import Header from './components/Header'
import Main from './components/Main'



function App() {
  
  useEffect(() => {
    console.log('Component mounted. ')
  }, [])

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
