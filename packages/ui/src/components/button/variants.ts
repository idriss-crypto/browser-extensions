import { FullyRequired } from '@idriss-xyz/utils';
import { cva, VariantProps } from 'class-variance-authority';

export const button = cva(
  [
    'group/button relative z-1 flex w-max items-center justify-center overflow-hidden rounded-xl',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
  ],
  {
    variants: {
      intent: {
        primary: [
          'bg-mint-400 text-neutralGreen-900 shadow-input',
          'hover:bg-mint-500',
          'active:bg-mint-600',
          'disabled:bg-neutral-400 disabled:text-white',
        ],
        secondary: [
          'border border-mint-400 bg-white text-neutralGreen-900 shadow-input',
          'hover:border-mint-500 hover:bg-mint-200',
          'active:border-mint-600 active:bg-mint-300',
          'disabled:border-none disabled:bg-neutral-400 disabled:text-white',
        ],
        tertiary: [
          'bg-transparent text-neutralGreen-900',
          'hover:text-mint-600',
          'active:text-mint-600',
          'disabled:text-neutral-500',
        ],
        negative: [
          'bg-neutralGreen-900 text-white',
          'hover:bg-neutralGreen-700',
          'active:bg-neutralGreen-500',
          'disabled:bg-neutral-400 disabled:text-white',
        ],
      },
      size: {
        large: ['px-5 py-4.5 text-button1'],
        medium: ['px-5 py-3.5 text-button2'],
        small: ['px-5 py-2 text-button2'],
      },

      withPrefixIcon: {
        true: ['pl-3'],
      },
      withSuffixIcon: {
        true: ['pr-3'],
      },
      loading: {
        true: [''],
        false: ['']
      }
    },
    compoundVariants: [
      //icon
      {
        size: 'medium',
        withPrefixIcon: true,
        className: 'py-3',
      },
      {
        size: 'medium',
        withSuffixIcon: true,
        className: 'py-3',
      },
      //loading
      {
        loading: true,
        intent: 'primary',
        className: 'disabled:bg-mint-400 disabled:text-neutralGreen-900',
      },
      {
        loading: true,
        intent: 'secondary',
        className: 'disabled:border-solid disabled:bg-white disabled:text-neutralGreen-900',
      },
      {
        loading: true,
        intent: 'tertiary',
        className: 'disabled:text-neutralGreen-900',
      },
      {
        loading: true,
        intent: 'negative',
        className: 'disabled:bg-neutralGreen-900 disabled:text-white',
      },
    ],
  },
);

type ComputedVariants = 'withPrefixIcon' | 'withSuffixIcon';

export type ButtonVariants = FullyRequired<
  Omit<VariantProps<typeof button>, ComputedVariants>
>;

export const glow = cva(
  [
    'absolute left-1/2 -z-1 size-full -translate-x-1/2 overflow-hidden rounded-[100%]',
  ],
  {
    variants: {
      intent: {
        primary: [
          'bg-lime-400 opacity-70 blur-md',
          'group-hover/button:opacity-0',
          'group-active/button:opacity-0',
          'group-disabled/button:hidden',
        ],
        secondary: [
          'bg-mint-400 opacity-40 blur-md',
          'group-disabled/button:hidden',
        ],
        tertiary: ['hidden'],
        negative: ['hidden'],
        disabled: ['hidden'],
      },
      size: {
        large: ['top-[36px] h-10'],
        medium: ['top-[28px] h-8'],
        small: ['top-[28px] h-8'],
      },
      loading: {
        true: [''],
        false: ['']
      }
    },
    compoundVariants: [
      //loading
      {
        loading: true,
        intent: 'primary',
        className: 'group-disabled/button:block',
      },
      {
        loading: true,
        intent: 'secondary',
        className: 'group-disabled/button:block',
      }
    ],
  },
);

export type GlowVariants = FullyRequired<VariantProps<typeof glow>>;
