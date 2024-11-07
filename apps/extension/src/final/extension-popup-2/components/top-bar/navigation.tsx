import { SOCIAL_LINK } from '@idriss-xyz/constants';
import { Icon } from '@idriss-xyz/ui/icon';
import { ExternalLink } from '@idriss-xyz/ui/external-link';
import { useCallback } from 'react';

import { useWallet } from 'shared/web3';

export const Navigation = () => {
  const { wallet, openConnectionModal, removeWalletInfo } = useWallet();

  const goToCustomization = useCallback(() => {}, []);

  return (
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
  );
};
