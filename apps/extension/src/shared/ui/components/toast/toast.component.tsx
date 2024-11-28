import * as RadixToast from '@radix-ui/react-toast';

import { ToastProperties } from './toast.types';

export const ToastComponent = ({ children }: ToastProperties) => {
  return (
    <RadixToast.Provider swipeDirection="right">
      {children}
      <RadixToast.Viewport className="fixed bottom-2 right-2 flex w-[400px] flex-col gap-y-2 overflow-hidden shadow-lg" />
    </RadixToast.Provider>
  );
};
