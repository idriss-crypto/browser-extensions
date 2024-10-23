import { FullyRequired } from '@idriss-xyz/utils';
import { cva, VariantProps } from 'class-variance-authority';

export const button = cva(
  'rounded-xl tracking-wider relative overflow-hidden group z-1 font-medium focus-visible:ring-borderfocus focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
  {
    variants: {
      intent: {
        primary: [
          'bg-brand-primary hover:bg-brand-secondary active:bg-brand-tertiary text-onsurface-primary',
        ],
      },
      size: {
        large: ['text-button1 px-5 py-4.5'],
      },
    },
  },
);

export type ButtonVariants = FullyRequired<VariantProps<typeof button>>;

export const glow = cva(
  'absolute left-1/2 top-[36px] size-full h-10 -translate-x-1/2 overflow-hidden rounded-[100%] opacity-70 blur-lg -z-1',
  {
    variants: {
      intent: {
        primary: [
          'bg-lime-400 group-hover:bg-mint-600 group-active:bg-mint-600',
        ],
      },
    },
  },
);

export type GlowVariants = FullyRequired<VariantProps<typeof glow>>;
