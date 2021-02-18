import { Container, Grid, Typography } from '@material-ui/core';
import { useContext, useState } from 'react';
import BuildList from '../../components/build-list/BuildList';
import { LikedContext } from '../../components/liked-context/LikedContext';
import PokemonDetail from '../../components/pokemon-detail/PokemonDetail';

const LikedPokemons = () => {
  const { likedPokemons } = useContext(LikedContext);

  const [selected, setSelected] = useState();

  return (
    <Container>
      <Typography className="title" align="center" variant="h4">
        There are {likedPokemons.length} liked Pokémon
      </Typography>
      <Grid container spacing={4}>
        <Grid xs={12} sm={6} item>
          <BuildList
            pokemons={likedPokemons}
            setPokemonSelected={setSelected}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <PokemonDetail pokemonURL={selected} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LikedPokemons;
