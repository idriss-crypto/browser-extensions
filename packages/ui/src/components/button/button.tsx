import { ButtonHTMLAttributes } from 'react';

import { variants, Variants } from './variants';

type Properties = ButtonHTMLAttributes<HTMLButtonElement> & Variants;

// TODO: probably we need isomorphic component so button can be used as <a> element which accepts 'href' attribute, consider doing it with forwardRef
export const Button = ({
  children,
  className,
  intent,
  size,
  ...properties
}: Properties) => {
  return (
    <button {...properties} className={variants({ intent, size, className })}>
      {children}
    </button>
  );
};
