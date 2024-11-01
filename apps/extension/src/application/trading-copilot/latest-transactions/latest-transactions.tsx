import { useState } from 'react';
import { TransactionListItem } from './transaction-list-item';

const UNISWAP_V3_SUBGRAPH_ID = {
  BASE: '43Hwfi3dJSoGpyas9VwNoDAv55yjgGrPpNSmbQZArzMG',
  CELO: 'ESdrTJ3twMwWVoQ1hUE2u7PugEHX3QkenudD6aXCkDQ4',
  OPTIMISM: 'Cghf4LfVqPiFw6fp6Y5X5Ubc8UpmUhSfJL82zwiBFLaj',
} as const;

export type SwapWithNetworkInfo = Swap & {
  _network: keyof typeof UNISWAP_V3_SUBGRAPH_ID;
};

type Swap = {
  amount0: string;
  amount1: string;
  amountUSD: string;
  id: string;
  logIndex: string;
  origin: string;
  pool: {
    id: string;
  };
  recipient: string;
  sender: string;
  sqrtPriceX96: string;
  tick: string;
  timestamp: string;
  token0: Token;
  token1: Token;
  transaction: {
    id: string;
  };
};
type Token = {
  name: string;
  symbol: string;
};

export const LatestTransactions = () => {
  const [transactionWithOpenedFormId, setTransactionWithOpenedFormId] =
    useState<string>();

  const transactions: SwapWithNetworkInfo[] = [
    {
      _network: 'BASE',
      amount0: '1',
      amount1: '1',
      amountUSD: '1',
      id: '1',
      logIndex: '1',
      origin: '1',
      pool: { id: '1' },
      recipient: '1',
      sender: '1',
      sqrtPriceX96: '1',
      tick: '1',
      timestamp: '1',
      token0: { name: '1', symbol: '1' },
      token1: { name: '1', symbol: '1' },
      transaction: { id: '1' },
    },
  ];

  const transactionsData = transactions as SwapWithNetworkInfo[] | undefined;

  if (!transactionsData?.length) {
    return null;
  }

  return (
    <div className="w-96 max-w-lg rounded-lg border-l-4 border-[#9ca3af] bg-[#e5e7eb] px-4 py-2">
      <ul role="list" className="divide-y divide-[#f3f4f6]">
        {transactionsData?.map((transaction) => {
          const isTransactionFormOpened =
            transactionWithOpenedFormId === transaction.id;

          return (
            <TransactionListItem
              className={
                transactionWithOpenedFormId && !isTransactionFormOpened
                  ? 'opacity-40'
                  : ''
              }
              isTransactionFormOpened={isTransactionFormOpened}
              onFormToggleClick={(transactionId) => {
                return setTransactionWithOpenedFormId(
                  isTransactionFormOpened ? undefined : transactionId,
                );
              }}
              transaction={transaction}
              key={transaction.id}
            />
          );
        })}
      </ul>
    </div>
  );
};
