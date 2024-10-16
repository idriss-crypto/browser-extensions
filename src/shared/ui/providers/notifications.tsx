import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { Cross2Icon } from '@radix-ui/react-icons';

import { classes } from '../utils';

interface NotificationContextType {
  success: (message: string) => void;
  error: (message: string) => void;
}

interface NotificationProperties {
  message: string;
  type: 'success' | 'error';
}

interface NotificationsProperties {
  className?: string;
  children: React.ReactNode;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

const NotificationsProvider = ({
  className: positionClassName,
  children,
}: NotificationsProperties) => {
  const [notifications, setNotifications] = useState<
    Map<string, NotificationProperties>
  >(new Map());
  const handleAddToast = useCallback((toast: NotificationProperties) => {
    setNotifications((previous) => {
      const newMap = new Map(previous);
      newMap.set(String(Date.now()), { ...toast });
      return newMap;
    });
  }, []);

  const handleRemoveToast = useCallback((key: string) => {
    setNotifications((previous) => {
      const newMap = new Map(previous);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const handleDispatchSuccess = useCallback(
    (message: string) => {
      return handleAddToast({ message, type: 'success' });
    },
    [handleAddToast],
  );

  const handleDispatchError = useCallback(
    (message: string) => {
      return handleAddToast({ message, type: 'error' });
    },
    [handleAddToast],
  );

  const contextValue = useMemo(() => {
    return {
      success: handleDispatchSuccess,
      error: handleDispatchError,
    };
  }, [handleDispatchSuccess, handleDispatchError]);

  return (
    <NotificationContext.Provider value={contextValue}>
      <ToastPrimitive.Provider>
        {children}
        {[...notifications].map(([key, notification]) => {
          return (
            <ToastPrimitive.Root
              duration={3000}
              key={key}
              onOpenChange={(open) => {
                if (!open) {
                  handleRemoveToast(key);
                }
              }}
              className={`flex w-80 items-center  justify-between rounded-lg p-4 shadow-lg ${
                notification.type === 'success' ? 'bg-[#11dd74]' : 'bg-red-100'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* <div
                  className={`flex size-6 items-center justify-center rounded-full ${
                    notification.type === 'success'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {notification.type === 'success' ? (
                    <CheckIcon />
                  ) : (
                    <Cross2Icon />
                  )}
                </div> */}
                <div>
                  <ToastPrimitive.Title className="text-sm font-medium text-white">
                    {notification.message}
                  </ToastPrimitive.Title>
                  <ToastPrimitive.Description className="text-sm text-gray-500">
                    {/* Monday, July 11, 9:55 AM */}
                  </ToastPrimitive.Description>
                </div>
              </div>
              <ToastPrimitive.Close className="flex size-6 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300">
                <Cross2Icon />
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          );
        })}
        <ToastPrimitive.Viewport
          className={classes(
            'fixed bottom-0 right-0 flex flex-col gap-4 p-6 outline-none z-[9999999]',
            positionClassName,
          )}
        />
      </ToastPrimitive.Provider>
    </NotificationContext.Provider>
  );
};

function useNotification() {
  const context = useContext(NotificationContext);
  if (context) return context;
  throw new Error('useNotification must be used within NotificationsProvider');
}

export { NotificationsProvider, useNotification };
