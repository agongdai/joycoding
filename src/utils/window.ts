export function isMobile(userAgent: string) {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(userAgent);
}

export function isOnServer() {
  return typeof window === 'undefined';
}
