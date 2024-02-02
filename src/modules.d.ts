import 'next-auth';

declare module 'react-tradingview-widget';

declare module 'next-auth' {
  interface User {
    id: string | number;
    isAdmin: boolean;
    provider: string | null;
    username?: string | null;
    image: string;
    name?: string | null;
    email?: string | null;
  }
}
