'use client';

import React, { useEffect } from 'react';

import Button from '@mui/material/Button';
import useWs from '@myex/hooks/useWs';

interface Props {
  leftPlayers: string;
  rightPlayers: string;
  currentPlayerId: number;
  gameId: number;
  punches: string;
}

export default function GameBoard({
  leftPlayers,
  rightPlayers,
  currentPlayerId,
  gameId,
  punches,
}: Props) {
  const { ws } = useWs(true);
  const [allPunches, setAllPunches] = React.useState<string[]>(String(punches).split(','));
  const isLeftPlayer = leftPlayers.split(',').includes(String(currentPlayerId));

  useEffect(() => {
    ws?.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      console.log('message', message);
      if (message.punches) {
        setAllPunches(message.punches.split(','));
      }
    });
  }, [ws]);

  const nPunchesLeft = allPunches.filter((punch) =>
    leftPlayers.split(',').includes(punch.split('-')[0]),
  ).length;
  const nPunchesRight = allPunches.filter((punch) =>
    rightPlayers.split(',').includes(punch.split('-')[0]),
  ).length;

  return (
    <div>
      <Button
        size='large'
        variant='contained'
        color='primary'
        classes={{ root: 'w-full my-4' }}
        onClick={() =>
          ws?.send(
            JSON.stringify({
              exchange: 6,
              gameId,
              playerId: currentPlayerId,
              action: 'pull',
            }),
          )
        }
      >
        {isLeftPlayer ? '<<<' : ''} Pull {isLeftPlayer ? '' : '>>>'}
      </Button>
      <div className='grid grid-cols-2'>
        <div className='bg-gray-800 p-4'>
          <h3>Left Players</h3>
          <h4># of Pulls: {nPunchesLeft}</h4>
          <ul>
            {leftPlayers.split(',').map((player, index) => (
              <li key={index}>
                Player {player}
                {currentPlayerId === Number(player) && <span> (You)</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-gray-600 p-4'>
          <h3>Right Players</h3>
          <h4># of Pulls: {nPunchesRight}</h4>
          <ul>
            {rightPlayers.split(',').map((player, index) => (
              <li key={index}>
                Player {player}
                {currentPlayerId === Number(player) && <span> (You)</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
