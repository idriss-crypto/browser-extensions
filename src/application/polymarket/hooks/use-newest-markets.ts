// use-newest-market.ts
import { useQuery } from '@tanstack/react-query';

import { useCommandMutation } from 'shared/messaging';

import { GetNewMarketCommand } from '../commands';
import { NewMarkets } from '../types';

export const useNewestMarket = () => {
  const getNewMarketCommandMutation = useCommandMutation(GetNewMarketCommand);

  return useQuery<NewMarkets, Error>({
    queryKey: ['newestMarket'],
    queryFn: async () => {
      const data = await getNewMarketCommandMutation.mutateAsync({ limit: 1 });
      return data;
    },
  });
};
