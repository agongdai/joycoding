'use client';

import React, { useEffect } from 'react';

export default function GameCountDown({
  gameId,
  gameStartTimestamp,
}: {
  gameId: number;
  gameStartTimestamp: number;
}) {
  const [timeLeft, setTimeLeft] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = gameStartTimestamp - now;
      setTimeLeft(Math.floor(distance / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStartTimestamp]);

  if (timeLeft <= 0) {
    return (
      <div>
        <h2>Game #{gameId} has started!</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Time to start game #{gameId}: {timeLeft} seconds
      </h2>
    </div>
  );
}
