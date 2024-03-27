import { Coin } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

interface QueryResult {
  isLoading: boolean;
  coins: Coin[];
}

export default function useMyexCoins(): QueryResult {
  const { isLoading, data } = useQuery({
    queryKey: ['myexCoins'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coins`);
      return res.json();
    },
  });

  return {
    isLoading,
    coins: data?.success ? data.data : [],
  };
}
