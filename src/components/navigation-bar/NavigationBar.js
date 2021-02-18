import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

const NavigationBar = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flex: 1 }}
            onClick={() => history.push('/')}
          >
            PokeApp
          </Typography>
          <Button onClick={() => history.push('/pokemons')} color="inherit">
            Saved Pokémon
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default NavigationBar;
