import {
  PortalContextProvider,
  WithQueryClient,
  WithTailwind,
} from 'shared/ui/providers';
import { WalletContextProvider, WithWalletConnectModal } from 'shared/web3';
import { ExtensionSettingsProvider } from 'shared/extension';
import { TwitterPageProvider } from 'shared/twitter';

import { PolymarketApp } from './polymarket';
import { SnapshotApp } from './snapshot';

export const Application = () => {
  return (
    <PortalContextProvider>
      <WithTailwind>
        <WithQueryClient>
          <WalletContextProvider>
            <WithWalletConnectModal>
              <ExtensionSettingsProvider>
                <TwitterPageProvider>
                  <PolymarketApp />
                  <SnapshotApp />
                </TwitterPageProvider>
              </ExtensionSettingsProvider>
            </WithWalletConnectModal>
          </WalletContextProvider>
        </WithQueryClient>
      </WithTailwind>
    </PortalContextProvider>
  );
};
