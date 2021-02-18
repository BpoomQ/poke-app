import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BuildList from '../../components/build-list/BuildList';
import PokemonDetail from '../../components/pokemon-detail/PokemonDetail';
import './style.scss';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonURL, setPokemonURL] = useState();
  const [totalItems, setTotalItems] = useState();
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    // Este metodo consulta la lista de pokemones en el API cada vez que el offset (variable necesaria para el paginado) cambia
    const getPokeList = async () => {
      try {
        setIsLoading(true);
        setPokemons([]);
        const response = await axios.get(
          `${process.env.REACT_APP_REST_API}/pokemon`,
          {
            params: { offset, limit: 10 },
          }
        );
        const { count, results } = response.data;
        setTotalItems(count);
        setPokemons(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPokeList();
  }, [offset]);

  if (isLoading) return <CircularProgress />;

  if (error) return <Alert severity="error">API error! Call a developer</Alert>;

  return (
    <Container>
      <Typography className="title" align="center" variant="h4">
        There are {totalItems} Pokemon
      </Typography>
      <Grid container spacing={4}>
        <Grid xs={12} sm={6} item>
          <BuildList pokemons={pokemons} setPokemonSelected={setPokemonURL} />
          {totalItems && (
            <Pagination
              count={Math.floor(totalItems / 10)}
              variant="outlined"
              color="secondary"
              page={page}
              siblingCount={0}
              boundaryCount={1}
              onChange={(_, value) => {
                setPage(value);
                setOffset(10 * (value - 1));
              }}
            />
          )}
        </Grid>
        <Grid xs={12} sm={6} item>
          <PokemonDetail pokemonURL={pokemonURL} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PokemonList;
