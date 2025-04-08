import { Routing } from './routes/Routing'
import { Toaster } from 'react-hot-toast';
import SessionProvider from './context/SessionProvider'
import './App.css'
import FavoritesProvider from './context/FavoriteProvider';
function App() {

  return (
    <>
    
      <SessionProvider>
        <FavoritesProvider>    
          <Routing />
        </FavoritesProvider>
      </SessionProvider>
    
    </>
  )
}

export default App
