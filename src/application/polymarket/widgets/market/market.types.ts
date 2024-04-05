import { z } from 'zod';

import { EnhancedToken, MarketData } from '../../polymarket.types';

import { marketFormSchema } from './market.schema';

export type MarketForm = z.infer<ReturnType<typeof marketFormSchema>>;

export interface MarketProperties {
  data: MarketData;
  tokens: EnhancedToken[];
  defaultValues?: Partial<MarketForm>;
  onRefresh: () => void;
  top: number;
  isAvailable: boolean;
  imageUrl: string;
  chance: number;
}

export interface MarketContainerProperties {
  top: number;
  conditionId: string;
  isAvailable: boolean;
}
