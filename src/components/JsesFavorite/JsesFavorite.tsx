'use client';
import React from 'react';

import { faStar } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@jses/components/AwesomeIcon';
import { useJsesDispatch, useJsesSelector } from '@jses/store';
import { toggleFavorite, toggleShowFavorites } from '@jses/store/trading/actions';
import { selectFavorites, selectShowFavorites } from '@jses/store/trading/selectors';
import { StyleVariant } from '@jses/types/common';

interface Props {
  symbol?: string;
  toToggleShowFavorites?: boolean;
}

export default function JsesFavorite({ symbol = '', toToggleShowFavorites = false }: Props) {
  const dispatch = useJsesDispatch();
  const favoritesState = useJsesSelector(selectFavorites);
  const showFavoritesState = useJsesSelector(selectShowFavorites);
  const isFavorite = toToggleShowFavorites ? showFavoritesState : favoritesState.includes(symbol);

  const onClick = () => {
    if (toToggleShowFavorites) {
      dispatch(toggleShowFavorites());
    } else {
      dispatch(toggleFavorite(symbol));
    }
  };

  return (
    <AwesomeIcon
      size='lg'
      icon={faStar}
      onClick={onClick}
      variant={isFavorite ? StyleVariant.Highlight : StyleVariant.Default}
      className='cursor-pointer transition'
    />
  );
}
