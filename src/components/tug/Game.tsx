import React from 'react';

import { myexFetchCurrentGame } from '@myex/app/serverActions/tug';
import GameBoard from '@myex/components/tug/GameBoard';
import GameCountDown from '@myex/components/tug/GameCountDown';

export default async function Game({ playerId }: { playerId: number }) {
  const game = await myexFetchCurrentGame();

  return (
    <div>
      {game && game.openTimestamp ? (
        <div>
          <GameCountDown gameId={game.myexId} gameStartTimestamp={Number(game.openTimestamp)} />
          <GameBoard
            gameId={game.myexId}
            currentPlayerId={playerId}
            leftPlayers={game.leftPlayers}
            rightPlayers={game.rightPlayers}
          />
        </div>
      ) : (
        <div>Please wait for a game to start.</div>
      )}
      <pre className='mt-16'>{JSON.stringify(game, null, 2)}</pre>
    </div>
  );
}
