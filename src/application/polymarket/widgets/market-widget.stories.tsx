import type { Meta, StoryObj } from '@storybook/react';

import { OUTCOME } from 'application/polymarket/constants';

import { Market } from './market-widget';

const meta: Meta<typeof Market> = {
  title: 'application/polymarket/market',
  component: Market,
  argTypes: {},
  // render: (parameters) => {
  //   return (
  //     <div className="grid">
  //       <VoteButton {...parameters}>{parameters.outcome}</VoteButton>
  //     </div>
  //   );
  // },
};

export default meta;

type Story = StoryObj<typeof Market>;

export const Primary: Story = {
  args: {
    top: 0,
    data: {
      image: '',
      active: true,
      closed: false,
      neg_risk: true,
      archived: false,
      accepting_orders: true,
      enable_order_book: true,
      tokens: [
        { outcome: OUTCOME.YES, token_id: '1' },
        { outcome: OUTCOME.NO, token_id: '2' },
      ],
      question: 'Some question here',
      condition_id: 'condition_id',
      minimum_tick_size: '0.01',
      minimum_order_size: '1',
    },
    tokens: [
      {
        outcome: OUTCOME.YES,
        token_id: '1',
        book: { asks: [], bids: [] },
        price: 1,
      },
      {
        outcome: OUTCOME.NO,
        token_id: '2',
        book: { asks: [], bids: [] },
        price: 1,
      },
    ],
    chance: 0.5,
    imageUrl: '',
  },
};
