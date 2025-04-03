import { useState, useEffect } from "react";
// import useFetchSolution from "../../hook/useFetchSolution";
import { useParams } from "react-router";


export  function GamePage(){
    const {id} = useParams;
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

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
        load();
    }, [id]);

    return(
        <>
          {error && <h1>{error}</h1>}
            <div className="style-gamepage">
                <div className="style-game-image">
                    <img src={data && data.background_image} alt="" />
                </div>
                <div className="style-game-info"> <p>{data && data. released}</p>
                    <h1>{data && data.name}</h1>
                    <p>Rating: {data && data. rating}</p>
                    <h3>About: </h3>
                    <p> {data && data.description_raw}</p>
                </div>
            </div>
        </>
    )
}