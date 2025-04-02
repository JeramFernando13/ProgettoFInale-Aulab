import {BrowserRouter, Routes, Route} from 'react-router';
import HomePage from '../pages/home/HomePage';
import Layout from '../layout/Layout';
import {GenrePage} from '../pages/genrepage/GenreIndex';
import {GamePage} from '../pages/gamepage/GamePage';
import SearchPage from '../pages/searchpage/searchPage';
import RegisterPage from '../pages/register/RegisterPage';
import {PlatformPage} from '../pages/platformpage/PlatformPage'

export function Routing(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element = {<HomePage />}/>
                    <Route path="/games/:genre" element={<GenrePage /> } />
                    <Route path='/games/:platform' element= {<PlatformPage /> } />
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/register" element={<RegisterPage />}/>
                    {/* <Route path="*" element={<ErrorPage />} /> */}

                </Route>
            </Routes>
        </BrowserRouter>
    )
}