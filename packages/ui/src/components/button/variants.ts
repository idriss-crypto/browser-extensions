import { FullyRequired } from '@idriss-xyz/utils';
import { cva, VariantProps } from 'class-variance-authority';

export const variants = cva(['rounded-xl tracking-wider'], {
  variants: {
    intent: {
      primary: [
        'bg-brand-primary hover:bg-brand-secondary active:bg-brand-tertiary text-onsurface-primary',
      ],
    },
    size: {
      large: ['text-base leading-tight px-3 py-4.5'],
    },
  },
});

export type Variants = FullyRequired<VariantProps<typeof variants>>;
