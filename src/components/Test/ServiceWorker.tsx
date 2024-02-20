'use client';
import React, { useEffect } from 'react';

export default function ServiceWorker() {
  const [worker, setWorker] = React.useState<Worker | null>(null);
  const [workerData, setWorkerData] = React.useState<number>(-1);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/worker.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  useEffect(() => {
    if (worker) {
      worker.onmessage = (event) => {
        console.log('Data from service worker:', event.data);
        setWorkerData(event.data);
      }
    }
  }, [worker]);

  return (
    <div>
      Data from service worker: {workerData}
    </div>
  )
}
