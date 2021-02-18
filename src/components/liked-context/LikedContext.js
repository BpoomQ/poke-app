import { createContext, useState } from 'react';

export const LikedContext = createContext();

export const LikedProvider = ({ children }) => {
  const [likedPokemons, setLikedPokemons] = useState([]);

  // método que sirve para agregar un nuevo pokémon a la lista de favoritos.
  const addLiked = (pokemonName, url) =>
    setLikedPokemons([...likedPokemons, { name: pokemonName, url }]);

  // método que sirve para eliminar un pokémon en la lista de favoritos.
  const removeLiked = (pokemonName) =>
    setLikedPokemons(likedPokemons.filter(({ name }) => name !== pokemonName));

  // método que verifica si un pokémon esta en almacenado en la lista.
  const isLiked = (pokemonName) =>
    !!likedPokemons.find(({ name }) => name === pokemonName);

  return (
    <LikedContext.Provider
      value={{ likedPokemons, addLiked, removeLiked, isLiked }}
    >
      {children}
    </LikedContext.Provider>
  );
};
