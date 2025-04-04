// import { useEffect, useState } from "react";
import useFetchSolution from "../../hook/useFetchSolution";
import { initialUrl } from "../../config";
import CardGame from "../../components/CardGame";

export default function HomePage() {
    const { data, error } = useFetchSolution(initialUrl);
    // const [data, setData] = useState(null);
    // const [error, setError] = useState(null);
    // const load = async () => {
    //     try {
    //         const response = await fetch(initialUrl);
    //         if (!response.ok) {
    //             throw new Error(response.statusText);
    //         }
    //         const json = await response.json();
    //         setData(json);
    //     } catch (error) {
    //         setError(error.message);
    //         setData(null);
    //     }
    // };

    // useEffect(() => {
    //     load();
    // }, []);
   
   
   
    return (
        <>
            <div className="grid">
                <h1 className="text-3xl text-center my-2">Home Page Rehacktor</h1>
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
}