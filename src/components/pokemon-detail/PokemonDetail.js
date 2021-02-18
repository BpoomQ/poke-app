import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { LikedContext } from '../../components/liked-context/LikedContext';
import './style.scss';

const PokemonDetail = ({ pokemonURL }) => {
  const { addLiked, removeLiked, isLiked } = useContext(LikedContext);

  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    // Método que consulta los detalles de un pokémon
    if (pokemonURL) {
      const getPokemonInfo = async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.get(`${pokemonURL}`);
          setPokemon(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      getPokemonInfo();
    }
  }, [pokemonURL]);

  if (isLoading) return <CircularProgress style={{ textAlign: 'center' }} />;
  if (!pokemon)
    return (
      <Typography className="pick-text" variant="h5">
        Select a pokémon
      </Typography>
    );
  const { name, id, sprites, types, height, weight } = pokemon;
  const { back_default, back_shiny, front_default, front_shiny } = sprites;

  return (
    <Card className="card">
      <CardHeader title={name} subheader={`Pokedex ID: ${id}`} />
      {back_default ? (
        <img className="media" src={back_default} alt="sprite back default" />
      ) : (
        <Typography align="center">No back default sprite</Typography>
      )}
      {front_default ? (
        <img className="media" src={front_default} alt="sprite front default" />
      ) : (
        <Typography align="center">No front default sprite</Typography>
      )}
      {back_shiny ? (
        <img className="media" src={back_shiny} alt="sprite back shiny" />
      ) : (
        <Typography align="center">No back shiny sprite</Typography>
      )}
      {front_shiny ? (
        <img className="media" src={front_shiny} alt="sprite front shiny" />
      ) : (
        <Typography align="center">No front shiny sprite</Typography>
      )}
      <CardContent>
        <Typography>
          Weight: {weight}, Height: {height * 10} cm
        </Typography>
        <Typography variant="subtitle2">
          Type: {types && types.map(({ type }) => type.name).join(' - ')}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isLiked(name) && (
          <FavoriteIcon onClick={() => removeLiked(name)} color="secondary" />
        )}
        {!isLiked(name) && (
          <FavoriteBorderIcon onClick={() => addLiked(name, pokemonURL)} />
        )}
      </CardActions>
    </Card>
  );
};

export default PokemonDetail;
