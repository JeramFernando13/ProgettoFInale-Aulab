import useFetchSolution from "../../hook/useFetchSolution";
import { initialUrl } from "../../config";
import CardGame from "../../components/CardGame";

export default function HomePage() {
    const { data, error } = useFetchSolution(initialUrl);
   
    return (
        <>
            <div className="grid">
                <h1 className="text-4xl font-bold text-center my-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg">
                   Welcome to Rehacktor Gaming 
                </h1>
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