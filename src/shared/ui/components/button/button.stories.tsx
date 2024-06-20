import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button.component';

const meta: Meta<typeof Button> = {
  title: 'shared/button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click',
  },
};
