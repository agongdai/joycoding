import { UserParameter } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

interface QueryResult {
  isLoading: boolean;
  userParameters: UserParameter[];
}

export default function useMyexUserParameters(): QueryResult {
  const { isLoading, data } = useQuery({
    queryKey: ['myexUserParameters'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userParameters`);
      return res.json();
    },
  });

  return {
    isLoading,
    userParameters: data?.success ? data.data : [],
  };
}
