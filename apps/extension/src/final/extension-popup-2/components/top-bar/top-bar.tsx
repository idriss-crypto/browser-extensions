import { IconButton } from '@idriss-xyz/ui/icon-button';
import { SOCIAL_LINK } from '@idriss-xyz/constants';
import { NavigationMenu } from '@idriss-xyz/ui/navigation-menu';
import { Switch } from '@idriss-xyz/ui/switch';
import { classes } from '@idriss-xyz/ui/utils';
import { useCallback } from 'react';
import { Icon } from '@idriss-xyz/ui/icon';

import { IDRISS_DARK_LOGO } from 'assets/images';
import { useExtensionSettings } from 'shared/extension';
import { useWallet } from 'shared/web3';

type Properties = {
  className?: string;
};

export const TopBar = ({ className }: Properties) => {
  const { extensionSettings, changeExtensionSetting } = useExtensionSettings();

  const toggleExtensionEnabled = useCallback(
    (value: boolean) => {
      void changeExtensionSetting({
        'entire-extension-enabled': value,
      });
    },
    [changeExtensionSetting],
  );

  return (
    <div
      className={classes(
        'z-1 flex items-center justify-between border-b border-b-neutral-300 bg-white px-6 py-0.5',
        className,
      )}
    >
      <img src={IDRISS_DARK_LOGO} className="h-4.5" alt="" />
      <div className="flex items-center space-x-6">
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item className="relative">
              <NavigationMenu.Trigger asChild>
                <IconButton iconName="Grip" size="medium" intent="tertiary" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute right-0 w-[240px] rounded-xl border border-neutral-300 bg-white shadow-lg" />
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <Switch
          value={extensionSettings['entire-extension-enabled']}
          onChange={toggleExtensionEnabled}
        />
      </div>
    </div>
  );
};
