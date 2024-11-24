import * as RadixToast from '@radix-ui/react-toast';
import { ReactNode } from 'react';

type Properties = {
  children: ReactNode;
};

export const Toast = ({ children }: Properties) => {
  return (
    <RadixToast.Provider swipeDirection="right">
        {children}
      <RadixToast.Viewport className="fixed right-2 bottom-2 w-[400px] overflow-hidden shadow-lg flex flex-col gap-y-2" />
    </RadixToast.Provider>
  );
};