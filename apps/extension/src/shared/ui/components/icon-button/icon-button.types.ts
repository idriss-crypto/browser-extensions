import { ButtonHTMLAttributes } from 'react';
import { IconName as IdrissIconName } from '@idriss-xyz/ui/icon';

import { IconProperties } from '../icon';

export type IconButtonProperties = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  testId?: string;
  iconProps: IconProperties;
};

export type IdrissIconButtonProperties = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  testId?: string;
  iconProps: {
    name: IdrissIconName;
    className?: string;
    size: number;
  };
};
