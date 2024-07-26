import { useQuery } from '@tanstack/react-query';

interface QueryResult<T> {
  isLoading: boolean;
  data: T;
}

export default function useMyexRestFetch<T>(key: string, defaultValue: T): QueryResult<T> {
  const { isLoading, data } = useQuery({
    queryKey: [`myex-rest-${key}`],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${key}`);
      return res.json();
    },
  });

  return {
    isLoading,
    data: data?.success ? data.data : defaultValue,
  };
}
