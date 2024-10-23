import { ReactNode } from 'react';

import { Button, Icon } from 'shared/ui';

interface Properties {
  heading: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

export const Error = ({ heading, children, onClose }: Properties) => {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon name="MinusCircledIcon" className="text-gray-300" size={112} />
      <p className="mt-4 text-lg font-medium leading-6 text-gray-900">
        {heading}
      </p>
      {children}
      <Button
        onClick={onClose}
        className="bg-idriss-primary-500 hover:bg-idriss-primary-400 mt-5 w-full rounded-md py-2 text-base font-medium text-white shadow-sm"
      >
        Close
      </Button>
    </div>
  );
};
