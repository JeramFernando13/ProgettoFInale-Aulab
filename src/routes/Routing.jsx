import {BrowserRouter, Routes, Route} from 'react-router';
import HomePage from '../pages/home/HomePage';
import Layout from '../layout/Layout';
import { GenrePage } from '../pages/genrepage/GenreIndex';


export function Routing(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element = {<HomePage />}/>
                    {/* <Route path="/games/:genre" element={<GenrePage /> } />
                    <Route path="/games/:slug/:id" element={<GamePage />} /> */}
                    {/* <Route path="*" element={<ErrorPage />} /> */}

                </Route>
            </Routes>
        </BrowserRouter>
    )
}