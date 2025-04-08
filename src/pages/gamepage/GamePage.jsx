import { useState, useEffect } from "react";
// import useFetchSolution from "../../hook/useFetchSolution";
import { useParams } from "react-router";
import ToggleFavorite from "../../components/ToggleFavorite";

export function GamePage(){
    const { id } = useParams();
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);

    const Api_Key = '2ba5d0b88a7b44a0b6c3b0af35ceb5e0';
    const initialUrl = `https://api.rawg.io/api/games/${id}?key=${Api_Key}`;
    // const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    const load = async () => {
        try{
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message);
            setData(null);
        }
    };

    useEffect(() => {
       if (id) load();
    }, [id]);

    return (
      <div className="min-h-screen text-black bg-white p-6">
        {error && <h1 className="text-red-400 text-2xl">{error}</h1>}

        {!data ? (
          <p className="text-center text-lg">Loadiang...</p>
        ) : (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={data.background_image}
                alt={data.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{data.name}</h1>
              <p className="text-gray-800">Release: {data.released}</p>
              <p className="text-yellow-500">⭐ Rating: {data.rating}</p>
              <ToggleFavorite data={data}/>
              <div>
                <h2 className="text-2xl taxt-dark font-semibold mb-2">Description</h2>
                <p className="text-gray-800 leading-relaxed">
                  {showMore ? data.description_raw : `${data.description_raw.substring(0, 300)}...`}
                </p>
                <button
                  className="text-blue-400  mt-2 hover:underline"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Read less" : "Read more ..."}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}