import { FullyRequired } from '@idriss-xyz/utils';
import { cva, VariantProps } from 'class-variance-authority';

export const link = cva(
  [
    'border-b border-b-mint-600 px-0.5 text-mint-600',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
    'hover:border-b-mint-700',
    'active:border-b-mint-800',
  ],
  {
    variants: {
      size: {
        medium: ['text-body5 lg:text-body4'],
      },
    },
  },
);

export type LinkVariants = FullyRequired<VariantProps<typeof link>>;
