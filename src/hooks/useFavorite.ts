import { myexUpdateUserParameter } from '@myex/app/serverActions/myexUserParameter';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { toggleFavorite, toggleShowFavorites } from '@myex/store/trading/actions';
import { selectFavorites, selectShowFavorites } from '@myex/store/trading/selectors';
import { SystemParameter } from '@myex/types/system';
import { toggleItemInArray } from '@myex/utils/array';
import { isOnServer } from '@myex/utils/window';

export default function useFavorite(showFavoritesServer: boolean, favoritesServer: string[]) {
  const dispatch = useMyexDispatch();
  const showFavoritesClient = useMyexSelector(selectShowFavorites);
  const favoritesClient = useMyexSelector(selectFavorites);
  const showFavorites = isOnServer() ? showFavoritesServer : showFavoritesClient;
  const favorites = isOnServer() ? favoritesServer : favoritesClient;

  const toggleShowFavoritesSync = () => {
    dispatch(toggleShowFavorites());
    myexUpdateUserParameter(SystemParameter.ShowFavorites, String(!showFavorites));
  };

  const toggleFavoriteSync = (currency: string) => {
    dispatch(toggleFavorite(currency?.toUpperCase()));
    myexUpdateUserParameter(
      SystemParameter.Favorites,
      JSON.stringify(toggleItemInArray<string>(favoritesClient, currency)),
    );
  };

  return {
    showFavorites,
    favorites,
    toggleShowFavoritesSync,
    toggleFavoriteSync,
  };
}
