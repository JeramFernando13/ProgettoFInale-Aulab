import { Link } from "react-router";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";

export function GenrePage() {
    const { genre } = useParams ();
    
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
           <h1>Welcome to {genre} page </h1>
           <div className="grid-games-list">
                {error && <article>{error}</article>}
                {data && data.results.map ( (game) => <CardGame key={game.id} 
                game={game} 
                />)}
            </div>
        </>
    )
}