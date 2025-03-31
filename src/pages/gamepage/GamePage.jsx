import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function GamePage(){
    const {id} = useParams;

    const [data, setData] = useState(null);
    const [erro, setError] = useError(null);

    const Api_Key = '2ba5d0b88a7b44a0b6c3b0af35ceb5e0';
    const initialUrl = `https://api.rawg.io/api/games/${id}?key=${Api_Key}`;

    const load = async () => {
        try{
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            SpeechSynthesisErrorEvent(error.message);
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
            <div className="style-game-info"> <p>{data && data. released}</p>
            <h1>{data && data.name}</h1>
            <p>Rating: {data && data. rating}</p>
            <p>About: </p>
            <p> {data && data.description_raw}</p>
            </div>
            <div className="style-game-image">
            <img sre={data && data background_image} alt="" />
            </div>
            </div>
        </>
    )
}