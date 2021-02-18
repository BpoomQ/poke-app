import { CircularProgress } from '@material-ui/core';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/navigation-bar/NavigationBar';

const PokemonList = lazy(() => import('./containers/pokemon-list/PokemonList'));
const LikedPokemons = lazy(() =>
  import('./containers/liked-pokemon/LikedPokemon')
);

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path="/pokemons" component={LikedPokemons} exact />
          <Route path="/" component={PokemonList} exact />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
