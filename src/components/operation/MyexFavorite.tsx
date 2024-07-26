'use client';
import React from 'react';

import { faStar } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import useFavorite from '@myex/hooks/useFavorite';
import { StyleVariant } from '@myex/types/common';

interface Props {
  currency?: string;
  toToggleShowFavorites?: boolean;
  showFavoritesServer: boolean;
  favoritesServer: string[];
}

export default function MyexFavorite({
  currency = '',
  toToggleShowFavorites = false,
  showFavoritesServer,
  favoritesServer,
}: Props) {
  const { toggleFavoriteSync, toggleShowFavoritesSync, favorites, showFavorites } = useFavorite(
    showFavoritesServer,
    favoritesServer,
  );

  const isFavorite = toToggleShowFavorites
    ? showFavorites
    : favorites.includes(currency?.toUpperCase());

  const onClick = () => {
    if (toToggleShowFavorites) {
      toggleShowFavoritesSync();
    } else {
      toggleFavoriteSync(currency?.toUpperCase());
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
