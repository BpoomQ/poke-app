import {
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useContext } from 'react';
import { LikedContext } from '../liked-context/LikedContext';

const BuildList = ({ pokemons, setPokemonSelected }) => {
  const { addLiked, removeLiked, isLiked } = useContext(LikedContext);

  return (
    <>
      <List className="list-container">
        {pokemons &&
          pokemons.map(({ name, url }, index) => (
            <div key={`${name}-${index}`}>
              <ListItem
                className="item"
                onClick={() => setPokemonSelected(url)}
              >
                <ListItemText primary={name} />
                <ListItemSecondaryAction>
                  {isLiked(name) && (
                    <FavoriteIcon
                      onClick={() => removeLiked(name)}
                      color="secondary"
                    />
                  )}
                  {!isLiked(name) && (
                    <FavoriteBorderIcon onClick={() => addLiked(name, url)} />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
      </List>
    </>
  );
};

export default BuildList;
