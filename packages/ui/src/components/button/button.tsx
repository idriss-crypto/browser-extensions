import { ButtonHTMLAttributes } from 'react';

import { classes } from '../../utils';
import { Icon, IconName } from '../icon';

import { button, ButtonVariants } from './variants';
import { Glow } from './glow';
import { BUTTON_SIZE_TO_ICON_SIZE } from './constants';

type Properties = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    prefixIconName?: IconName;
    suffixIconName?: IconName;
  };

// TODO: probably we need isomorphic component so button can be used as <a> element which accepts 'href' attribute, consider doing it with forwardRef
export const Button = ({
  children,
  className,
  intent,
  size,
  prefixIconName,
  suffixIconName,
  ...properties
}: Properties) => {
  return (
    <button
      {...properties}
      className={classes(
        button({
          intent,
          size,
          className,
          withPrefixIcon: Boolean(prefixIconName),
          withSuffixIcon: Boolean(suffixIconName),
        }),
      )}
    >
      {prefixIconName && (
        <Icon name={prefixIconName} size={BUTTON_SIZE_TO_ICON_SIZE[size]} />
      )}
      <span>{children}</span>
      {suffixIconName && (
        <Icon name={suffixIconName} size={BUTTON_SIZE_TO_ICON_SIZE[size]} />
      )}
      <Glow intent={intent} size={size} />
    </button>
  );
};
