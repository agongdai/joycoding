const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed');
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener('activate', () => {
    console.log('service worker activated');

    // const title = 'Title of the notification';
    // const body = 'content of the notification';
    // const icon = 'some-icon.png';
    // const notificationOptions = {
    //   body: body,
    //   tag: 'simple-push-notification-example',
    //   icon: icon
    // };

    // return self.Notification.requestPermission().then((permission) => {
    //   if (permission === 'granted') {
    //     return new self.Notification(title, notificationOptions);
    //   }
    // });
  });
};
activateEvent();

// const cacheName = 'v1'
//
// const cacheClone = async (e) => {
//   const res = await fetch(e.request);
//   const resClone = res.clone();
//
//   const cache = await caches.open(cacheName);
//   await cache.put(e.request, resClone);
//   return res;
// };

// const fetchEvent = () => {
  // self.addEventListener('fetch', (e) => {
  //   e.respondWith(
  //     cacheClone(e)
  //       .catch(() => caches.match(e.request))
  //       .then((res) => res)
  //   );
  // });
// };

// fetchEvent();
