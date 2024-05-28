'use client';
import React from 'react';

import { faStar } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { toggleFavorite, toggleShowFavorites } from '@myex/store/trading/actions';
import { selectFavorites, selectShowFavorites } from '@myex/store/trading/selectors';
import { StyleVariant } from '@myex/types/common';

interface Props {
  currency?: string;
  toToggleShowFavorites?: boolean;
}

export default function MyexFavorite({ currency = '', toToggleShowFavorites = false }: Props) {
  const dispatch = useMyexDispatch();
  const favoritesState = useMyexSelector(selectFavorites);
  const showFavoritesState = useMyexSelector(selectShowFavorites);
  const isFavorite = toToggleShowFavorites
    ? showFavoritesState
    : favoritesState.includes(currency?.toUpperCase());

  const onClick = () => {
    if (toToggleShowFavorites) {
      dispatch(toggleShowFavorites());
    } else {
      dispatch(toggleFavorite(currency?.toUpperCase()));
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
