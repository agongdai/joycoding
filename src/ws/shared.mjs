const shared = (function() {
  let wsBaseUrl = null;

  return {
    getWsBaseUrl: () => wsBaseUrl,
    setWsBaseUrl: (url) => wsBaseUrl = url,
  };
})();

export default shared;
