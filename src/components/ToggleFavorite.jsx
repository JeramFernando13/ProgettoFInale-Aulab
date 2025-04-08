import { useState, useContext } from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import FavoritesContext from "../context/FavoritesContext";
 
export default function ToggleFavorite({ data }) {
    const {favorites, addFavorites, removeFavorites} = useContext(FavoritesContext);

    const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);

    
    return (
        <>
        {isFavorite() ? (  
            <button
                onClick={() => removeFavorites(data.id)}
                className="flex items-center space-x-2 py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200">
                <span>remove Favorites</span>
                <FaHeart className="text-xl" />
            </button>
           
        ):(
           <button
                onClick={() => addFavorites(data)}
                className="flex items-center space-x-2 py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200">
                <span>add Favorites</span>
                <FaRegHeart className="text-xl" />
            </button>
        )}
            
           
        </>
    );

}