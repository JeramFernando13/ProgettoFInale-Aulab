import { Routing } from './routes/Routing'
import SessionProvider from './context/SessionProvider'
import './App.css'
function App() {

  return (
    <>
     
      <SessionProvider>
        <Routing />
      </ SessionProvider>
      
    </>
  )
}

export default App
