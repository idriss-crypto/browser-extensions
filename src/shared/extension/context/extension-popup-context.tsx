import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import debounce from 'lodash/debounce';
import { MemoryRouter, useLocation, useNavigate } from 'react-router';

import {
  onWindowMessage,
  TOGGLE_EXTENSION_POPUP_VISIBILITY,
} from 'shared/messaging';
import {
  createContextHook,
  NotificationsProvider,
  useNotification,
} from 'shared/ui';

import { ExtensionPopupRoute } from '../constants';

interface Properties {
  children: ReactNode;
}

interface ExtensionPopupContextValues {
  isVisible: boolean;
  navigate: (route: ExtensionPopupRoute) => void;
  navigateBack: () => void;
  currentRoute: ExtensionPopupRoute;
  hide: () => void;
  open: () => void;
  showNotification: (message: string) => void;
}

const ExtensionPopupContext = createContext<
  ExtensionPopupContextValues | undefined
>(undefined);

const InnerExtensionPopupProvider = ({ children }: Properties) => {
  const [isVisible, setIsVisible] = useState(false);
  const notification = useNotification();

  const navigate = useNavigate();
  const location = useLocation();

  const showNotification = (message: string) => {
    notification.success(message);
  };

  const navigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleVisibility = useCallback(
    debounce(() => {
      setIsVisible((previous) => {
        return !previous;
      });
    }, 50),
    [],
  );

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const open = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    onWindowMessage(TOGGLE_EXTENSION_POPUP_VISIBILITY, () => {
      toggleVisibility();
    });
  }, [toggleVisibility]);

  // Clean up the debounced function on component unmount
  useEffect(() => {
    return () => {
      toggleVisibility.cancel();
    };
  }, [toggleVisibility]);

  return (
    <ExtensionPopupContext.Provider
      value={{
        isVisible,
        currentRoute: location.pathname as ExtensionPopupRoute,
        navigate,
        navigateBack,
        hide,
        open,
        showNotification,
      }}
    >
      {children}
    </ExtensionPopupContext.Provider>
  );
};

export const ExtensionPopupProvider = ({ children }: Properties) => {
  return (
    <MemoryRouter>
      <NotificationsProvider >
        <InnerExtensionPopupProvider>{children}</InnerExtensionPopupProvider>
      </NotificationsProvider>
    </MemoryRouter>
  );
};

export const useExtensionPopup = createContextHook(ExtensionPopupContext);
