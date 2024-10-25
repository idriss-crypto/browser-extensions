import { ReactNode, useCallback } from 'react';

import {
  EXTENSION_POPUP_ROUTE,
  ROUTE_TITLE,
  useExtensionPopup,
} from 'shared/extension';
import { IconButton } from 'shared/ui';

type Properties = {
  title?: string;
  prefix?: ReactNode;
};

export const SettingsLayoutHeader = ({ title, prefix }: Properties) => {
  const extensionPopup = useExtensionPopup();

  const goHome = useCallback(() => {
    extensionPopup.navigate(EXTENSION_POPUP_ROUTE.HOME);
  }, [extensionPopup]);

  return (
    <div className="bg-gray-100 sticky top-0 flex items-center justify-between px-6 py-4 text-lg font-bold">
      {prefix ?? (
        <IconButton
          className="hover:text-green-500 text-black"
          iconProps={{ name: 'ArrowLeftIcon', size: 24 }}
          onClick={() => {
            extensionPopup.navigateBack();
          }}
        />
      )}

      <span className="block">
        {title ?? ROUTE_TITLE[extensionPopup.currentRoute]}
      </span>

      <IconButton
        className="hover:text-green-500 text-black"
        iconProps={{ name: 'Cross1Icon', size: 24 }}
        onClick={goHome}
      />
    </div>
  );
};
