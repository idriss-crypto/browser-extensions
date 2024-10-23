import { ButtonHTMLAttributes } from 'react';

import { variants, Variants } from './variants';

type Properties = ButtonHTMLAttributes<HTMLButtonElement> & Variants;

export const Button = ({
  children,
  className,
  intent,
  size,
  ...properties
}: Properties) => {
  return (
    <button className={variants({ intent, size, className })} {...properties}>
      {children}
    </button>
  );
};
