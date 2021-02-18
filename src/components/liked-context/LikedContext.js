import { createContext, useState } from 'react';

export const LikedContext = createContext();

export const LikedProvider = ({ children }) => {
  const [likedPokemons, setLikedPokemons] = useState([]);

  const addLiked = (pokemonName, url) =>
    setLikedPokemons([...likedPokemons, { name: pokemonName, url }]);

  const removeLiked = (pokemonName) =>
    setLikedPokemons(likedPokemons.filter(({ name }) => name !== pokemonName));

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
