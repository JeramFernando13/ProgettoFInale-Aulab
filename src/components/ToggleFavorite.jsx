import { useState, useContext } from "react";
import supabase from '../supabase/supabase-client'
import SessionContext from "../context/SessionContext";
import { IconButton  } from "@material-tailwind/react";
 
export default function ToggleFavorite({data}) {
    const {session} = useContext(SessionContext);
    const [favorites, setFavorites] = useState([]);

    const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);

    const addFavorites = async (game) => {
        if (!game || !game.id) {
            console.error("Errore: Il gioco è undefined o non ha un ID valido.");
            return;
        }
    
        if (!session?.user?.id) {
            alert("Devi essere autenticato per aggiungere ai preferiti!");
            return;
        }
    
        const { data: insertedData, error } = await supabase
            .from('favorites')
            .insert([
                {
                    user_id: session.user.id,
                    game_id: game.id,
                    game_name: game.name,
                    game_image: game.background_image,
                },
            ])
            .select();
    
        if (error) {
            alert(error.message);
        } else {
            setFavorites(insertedData);
        }
    };
    
    // Assicurati che `data` sia definito prima di chiamare addFavorites
    return (
        <a href="#buttons-with-link" onClick={() => data && addFavorites(data)}>
            {isFavorite() ? (
                <IconButton>
                    <i className="fas fa-heart" />
                </IconButton>
            ) : (
                <IconButton variant="gradient">
                    <i className="fas fa-heart" />
                </IconButton>
            )}
        </a>
    );

 }