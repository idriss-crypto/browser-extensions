import { ExternalLink } from '@idriss-xyz/ui/external-link';

import {
  AGORA_LOGO,
  POLYMARKET_LOGO,
  SNAPSHOT_LOGO,
  TALLY_LOGO,
} from 'shared/web3';
import { IDRISS_ICON } from 'shared/idriss';
import { EXTENSION_POPUP_ROUTE, useExtensionPopup } from 'shared/extension';

import { TRADING_COPILOT_LOGO } from '../../constants';

import { SectionTile } from './components';

export const HomeView = () => {
  const extensionPopup = useExtensionPopup();

  return (
    <div className="flex max-w-[470px] grow flex-col items-center bg-[#f3f4f6] px-1 py-4">
      <header className="mb-4 text-center">
        <h1 className="mb-1 text-xl font-bold text-black">
          {`GM, it's your web3 copilot speaking`}
        </h1>
        <p className="text-sm text-[#4b5563]">
          Explore your favorite features below
        </p>
      </header>

      <div className="grid w-full grid-cols-2 gap-3 px-3">
        <ExternalLink href="https://x.com/IDriss_xyz/status/1729258820441170160">
          <SectionTile
            icons={[{ iconSrc: IDRISS_ICON, iconAlt: 'Tipping Icon' }]}
            title="Tipping Badges"
            subtitle="Send crypto on X and Farcaster"
            className="transition-transform duration-[600ms] hover:scale-105 hover:bg-[#f9fafb]"
          />
        </ExternalLink>
        <ExternalLink href="https://x.com/IDriss_xyz/status/1761049574691819798">
          <SectionTile
            icons={[
              {
                iconSrc: AGORA_LOGO,
                iconAlt: 'Agora Logo',
                className: 'size-5 rounded-none',
              },
              {
                iconSrc: SNAPSHOT_LOGO,
                iconAlt: 'Snapshot Logo',
                className: 'size-6',
              },
              {
                iconSrc: TALLY_LOGO,
                iconAlt: 'Tally Logo',
                className: 'size-6',
              },
            ]}
            title="Governance Widget"
            subtitle="Get alerts for active DAO votes"
            iconContainerClassName="mt-2"
            className="transition-transform duration-[600ms] hover:scale-105 hover:bg-[#f9fafb]"
          />
        </ExternalLink>
        <ExternalLink href="https://x.com/IDriss_xyz/status/1780582103396266085">
          <SectionTile
            icons={[{ iconSrc: POLYMARKET_LOGO, iconAlt: 'Polymarket Logo' }]}
            title="Polymarket Widget"
            subtitle="Trade directly from your X feed"
            className="transition-transform duration-[600ms] hover:scale-105 hover:bg-[#f9fafb]"
          />
        </ExternalLink>

        <SectionTile
          icons={[{ iconSrc: TRADING_COPILOT_LOGO, iconAlt: 'Trading Icon' }]}
          title="Trading Copilot"
          subtitle="Coming soon"
          className="cursor-not-allowed bg-[#E5E7EB] opacity-50"
          hideExternalLinkIcon
        />
      </div>

      <div className="mt-4">
        <button
          className="rounded-lg bg-[#11DD74] px-5 py-2 text-sm font-medium text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#11DD74]"
          onClick={() => {
            extensionPopup.navigate(
              EXTENSION_POPUP_ROUTE.SETTINGS_CUSTOMIZATION,
            );
          }}
        >
          Customize Your Experience
        </button>
      </div>
    </div>
  );
};
