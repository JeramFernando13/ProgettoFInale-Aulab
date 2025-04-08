import { Link } from "react-router";
import { useState, useEffect } from "react";
import useFetchSolution from "../../hook/useFetchSolution";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";

export function PlatformPage() {
    const { platform } = useParams();
    const [data, setData] = useState([null]);
    const [error, setError] = useState(null);
   
    const Api_Key = '2ba5d0b88a7b44a0b6c3b0af35ceb5e0'
    const initialUrl = `https://api.rawg.io/api/games?key=${Api_Key}&platforms=${platform}&page=1`;
    
   
    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json.results);
        } catch (error) {
            setError(error.message);
            setData(null);
        }
    };
    
    useEffect(() => {
        load();
    }, [platform]);

    return (
        <>
            <div className="grid">
                <h1 className="text-3xl text-center my-2">Welcome to {platform} page</h1>
                {error && <div className="text-red-500">{error}</div>}
                
                {data.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-6 ">
                        {data.map((game) => (
                            <CardGame key={game.id} game={game} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Nessun gioco trovato per questa piattaforma.</p>
                )}
            </div>
        </>
    )
}