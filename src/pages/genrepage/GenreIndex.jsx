import { Link } from "react-router";
import { useState, useEffect } from "react";
import useFetchSolution from "../../hook/useFetchSolution";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";

export function GenrePage() {
    const { genre } = useParams ();
    // const { data, error } = useFetchSolution(initialUrl);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
   
   
    const Api_Key = '2ba5d0b88a7b44a0b6c3b0af35ceb5e0'
    const initialUrl = `https://api.rawg.io/api/games?key=${Api_Key}&genres=${genre}&page=1`;
   
   
    const load = async () => {
    try {
        const response = await fetch(initialUrl);
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        const json = await response.json();
        setData (json) ;
        } catch (error) {
        setError(error.message) ;
        setData (null);
        }
    };
    useEffect (() => {
    load ();
    }, [genre]);


    return (
        <>

            <div className="grid">
                <h1 className="text-4xl font-bold text-center my-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg">Welcome to {genre} page</h1>
                {error && <div className="text-red-500">{error}</div>}
                
                {data && (
                    <div className="flex flex-wrap justify-center gap-6 ">
                        {data && data.results.map ( (game) => <CardGame key={game.id} 
                            game={game}/>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}