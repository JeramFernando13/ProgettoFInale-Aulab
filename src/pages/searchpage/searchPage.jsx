import { useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import { API_KEY } from "../../config";



export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get('query');

    const Api_Key = API_KEY  ;
    const initialUrl = `https://api.rawg.io/api/games?key=${Api_Key}&search=${game}`

    const {loading, data, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return(
        <>
            <div className="grid">
                <h1 className="text-3xl text-center my-2">Risultati per: {game} </h1>
                {loading && <p>loading...</p> }
                {error && <div className="text-red-500">{error}</div>}
                
                {data && (
                <div className="flex flex-wrap justify-center gap-6 ">
                    {data.results.map((game) => (
                        <CardGame key={game.id} game={game} />
                    ))}
                </div>
                )}
            </div>
        </>
    );
};