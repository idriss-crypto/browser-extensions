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

// TODO: move this to new package @idriss-xyz/utils since it is a generic reusable type util
type RequiredProperty<T extends object> = {
  [P in keyof T]-?: Required<NonNullable<T[P]>>;
};
export type Variants = RequiredProperty<VariantProps<typeof variants>>;
