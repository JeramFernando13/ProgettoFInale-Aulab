import {BrowserRouter, Routes, Route} from 'react-router';
import HomePage from '../pages/home/HomePage';
import Layout from '../layout/Layout';
import {GenrePage} from '../pages/genrepage/GenreIndex';
import {GamePage} from '../pages/gamepage/GamePage';
import SearchPage from '../pages/searchpage/searchPage';
import RegisterPage from '../pages/register/RegisterPage';
import {PlatformPage} from '../pages/platformpage/PlatformPage'
import LoginPage from '../pages/login/LoginPage';

export function Routing(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element = {<HomePage />}/>
                    {/* <Route path="*" element={<ErrorPage />} /> */}
                   
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="/games/:genre" element={<GenrePage /> } />
                    <Route path='/games/:platform' element= {<PlatformPage /> } />
                   
                    <Route path="/search" element={<SearchPage />} />
                   
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/account" element={<AccountPage />}/>


                </Route>
            </Routes>
        </BrowserRouter>
    )
}