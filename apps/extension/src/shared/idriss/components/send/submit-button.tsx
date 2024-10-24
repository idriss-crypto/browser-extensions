import { ReactNode } from 'react';

import { Button } from 'shared/ui';

interface Properties {
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

export const SubmitButton = ({ loading, children, disabled }: Properties) => {
  return (
    <Button
      loading={loading}
      disabled={disabled}
      className="bg-idriss-primary-500 hover:bg-idriss-primary-400 w-full rounded-md py-2 text-base font-medium text-white shadow-sm"
      type="submit"
    >
      {children}
    </Button>
  );
};
