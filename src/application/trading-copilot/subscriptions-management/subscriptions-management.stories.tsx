import type { Meta, StoryObj } from '@storybook/react';

import { SubscriptionsManagement } from './subscriptions-management';

const meta: Meta<typeof SubscriptionsManagement> = {
  title: 'application/trading-copilot/subscriptions-management',
  component: SubscriptionsManagement,
};

export default meta;

type Story = StoryObj<typeof SubscriptionsManagement>;

export const Primary: Story = {};
