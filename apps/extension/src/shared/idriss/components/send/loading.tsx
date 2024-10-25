import { ReactNode } from 'react';

import { Icon, Spinner } from 'shared/ui';

interface Properties {
  recipient: string;
  heading: ReactNode;
  children: ReactNode;
}

export const Loading = ({ recipient, heading, children }: Properties) => {
  return (
    <div className="flex flex-col items-center text-center">
      <Spinner className="size-24 text-idriss-primary-500" />
      <p className="text-gray-900 mt-8 text-lg font-medium leading-6">
        Waiting for Confirmation
      </p>
      <p className="text-gray-900 mt-1 leading-6">{heading}</p>
      <p className="flex items-center space-x-1">
        <span>to </span>
        <span
          className="block max-w-40 truncate whitespace-nowrap"
          title={recipient}
        >
          @{recipient}
        </span>{' '}
        <Icon
          size={16}
          name="TwitterLogoIcon"
          className="text-twitter-primary [&>path]:fill-rule-non-zero"
        />
      </p>
      <p className="text-gray-500 mt-1 text-xs font-medium leading-6">
        {children}
      </p>
    </div>
  );
};
