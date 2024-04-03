import { memo, useCallback, useMemo } from 'react';

import {
  useTokensBooks,
  useMarketByConditionId,
  useTokensPrices,
} from '../../hooks';
import { EnhancedToken } from '../../polymarket.types';

import { MarketContainerProperties } from './market.types';
import { Market } from './market.component';

export const MarketContainer = memo(
  ({ conditionId, isAvailable, top }: MarketContainerProperties) => {
    const marketQuery = useMarketByConditionId({
      conditionId,
    });

    const tokensIds = useMemo(() => {
      if (!marketQuery.data) {
        return;
      }
      return marketQuery.data.tokens.map((token) => {
        return token.token_id;
      });
    }, [marketQuery.data]);

    const tokensPricesQuery = useTokensPrices({
      tokensIds: tokensIds ?? [],
    });

    const tokensBooksQuery = useTokensBooks({
      tokensIds: tokensIds ?? [],
    });

    const tokens: EnhancedToken[] = useMemo(() => {
      if (
        !tokensPricesQuery.data ||
        !marketQuery.data ||
        !tokensBooksQuery.data
      ) {
        return [];
      }

      return marketQuery.data.tokens
        .map((token) => {
          const price = tokensPricesQuery.data[token.token_id];
          const book = tokensBooksQuery.data[token.token_id];

          if (!price || !book) {
            return;
          }

          return { ...token, price, book };
        })
        .filter(Boolean);
    }, [marketQuery.data, tokensBooksQuery.data, tokensPricesQuery.data]);

    const refresh = useCallback(async () => {
      await marketQuery.refetch();
      await tokensPricesQuery.refetch();
    }, [marketQuery, tokensPricesQuery]);

    if (!marketQuery.data || !tokensPricesQuery.data || tokens.length === 0) {
      return null;
    }

    if (marketQuery.data.closed) {
      return null;
    }

    return (
      <Market
        top={top}
        data={marketQuery.data}
        tokens={tokens}
        isAvailable={isAvailable}
        onRefresh={refresh}
        defaultValues={{
          selectedTokenId: tokens[0]?.token_id,
        }}
      />
    );
  },
);

MarketContainer.displayName = 'MarketContainer';
