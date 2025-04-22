import React, { useContext } from 'react';
import FavoritesContext from '../../context/FavoritesContext';
import CardGame from '../../components/CardGame';

export default function FavoritePage() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg"> Your Favorite Games</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((game) => (
            <CardGame
              key={game.game_id}
              
              game={{
                id: game.game_id,
                name: game.game_name,
                genres: game.genres || [],
                released: game.released || '',
                rating: game.rating || 0,
                background_image: game.game_image,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}