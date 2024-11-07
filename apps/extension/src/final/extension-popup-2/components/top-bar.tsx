import { IconButton } from '@idriss-xyz/ui/icon-button';
import { SOCIAL_LINK } from '@idriss-xyz/constants';
import { NavigationMenu } from '@idriss-xyz/ui/navigation-menu';
import { Switch } from '@idriss-xyz/ui/switch';
import { classes } from '@idriss-xyz/ui/utils';
import { useCallback } from 'react';
import { Icon } from '@idriss-xyz/ui/icon';
import { ExternalLink } from '@idriss-xyz/ui/external-link';

import { IDRISS_DARK_LOGO } from 'assets/images';
import { useExtensionSettings } from 'shared/extension';
import { useWallet } from 'shared/web3';

type Properties = {
  className?: string;
};

export const TopBar = ({ className }: Properties) => {
  const { extensionSettings, changeExtensionSetting } = useExtensionSettings();
  const { wallet, openConnectionModal, removeWalletInfo } = useWallet();

  const toggleExtensionEnabled = useCallback(
    (value: boolean) => {
      void changeExtensionSetting({
        'entire-extension-enabled': value,
      });
    },
    [changeExtensionSetting],
  );

  const goToCustomization = useCallback(() => {}, []);

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
              <NavigationMenu.Content className="absolute right-0 w-[240px] rounded-xl border border-neutral-300 bg-white shadow-lg">
                <ul>
                  <li>
                    <button
                      onClick={goToCustomization}
                      className="group flex w-full items-center space-x-3 px-3 pb-1.5 pt-3"
                    >
                      <Icon
                        className="text-neutral-600 group-hover:text-mint-600"
                        name="Settings"
                        size={20}
                      />
                      <span className="text-body4 text-neutral-900 group-hover:text-mint-600">
                        Customization
                      </span>
                    </button>
                  </li>

                  <li>
                    <ExternalLink
                      href={SOCIAL_LINK.DISCORD}
                      className="group flex w-full items-center space-x-3 px-3 pb-3 pt-1.5"
                    >
                      <Icon
                        className="text-neutral-600 group-hover:text-mint-600"
                        name="HelpCircle"
                        size={20}
                      />
                      <span className="text-body4 text-neutral-900 group-hover:text-mint-600">
                        Support
                      </span>
                    </ExternalLink>
                  </li>

                  <hr className="text-neutral-200" />

                  <li>
                    <button
                      onClick={wallet ? removeWalletInfo : openConnectionModal}
                      className="group flex w-full items-center space-x-3 p-3"
                    >
                      <Icon
                        className="text-neutral-600 group-hover:text-mint-600"
                        name={wallet ? 'LogOut' : 'LogIn'}
                        size={20}
                      />
                      <span className="text-body4 text-neutral-900 group-hover:text-mint-600">
                        {wallet ? 'Log Out' : 'Log In'}
                      </span>
                    </button>
                  </li>
                </ul>
              </NavigationMenu.Content>
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
