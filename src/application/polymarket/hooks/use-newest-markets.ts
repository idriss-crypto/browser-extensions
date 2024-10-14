// use-newest-market.ts
import { useQuery } from '@tanstack/react-query';

import { useCommandMutation } from 'shared/messaging';
import { NewMarketMinified } from 'shared/extension';

import { GetNewMarketCommand } from '../commands';

export const useNewestMarket = () => {
  const getNewMarketCommandMutation = useCommandMutation(GetNewMarketCommand);

  return useQuery<NewMarketMinified, Error>({
    queryKey: ['newestMarket'],
    queryFn: async () => {
      const data = await getNewMarketCommandMutation.mutateAsync({ limit: 5 });
      return data;
    },
  });
};
