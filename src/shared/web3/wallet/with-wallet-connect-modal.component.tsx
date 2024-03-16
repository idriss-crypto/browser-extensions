import { createStore } from 'mipd';
import { ReactNode, useCallback, useMemo, useSyncExternalStore } from 'react';

import { Icon, IdrissLogo, Modal } from 'shared/ui/components';

import { useSwitchChain } from '../web3.hooks';
import { CHAIN } from '../web3.constants';
import { Hex } from '../web3.types';

import { useWallet } from './wallet.hook';

interface Properties {
  children: ReactNode;
}

export const WithWalletConnectModal = ({ children }: Properties) => {
  const {
    isModalOpened,
    provider,
    availableAccounts,
    isConnecting,
    closeConnectionModal,
    chooseProvider,
    chooseAccount,
  } = useWallet();
  const walletProvidersStore = useMemo(() => {
    return createStore();
  }, []);

  const switchChain = useSwitchChain();

  const chooseAccountAndSwitchChain = useCallback(
    async (account: Hex) => {
      if (provider) {
        await switchChain.mutateAsync({
          walletProvider: provider,
          chainId: CHAIN.POLYGON.id,
        });
      }
      chooseAccount(account);
    },
    [chooseAccount, provider, switchChain],
  );

  const availableWalletProviders = useSyncExternalStore(
    walletProvidersStore.subscribe,
    walletProvidersStore.getProviders,
  );

  return (
    <>
      {children}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <IdrissLogo size={24} />
            <p>Choose wallet</p>
          </div>
        }
        onClose={closeConnectionModal}
        isOpened={isModalOpened}
      >
        <div className="flex flex-col space-y-2">
          {availableWalletProviders.length === 0 && (
            <p>We couldn&apos;t find any wallet provider.</p>
          )}
          {switchChain.isPending ? (
            'Please approve switching chain'
          ) : provider ? (
            <>
              {availableAccounts.map((account) => {
                return (
                  <button
                    className="flex items-center space-x-4 rounded bg-[#555] px-4 py-2 shadow-md hover:bg-[#777]"
                    onClick={() => {
                      void chooseAccountAndSwitchChain(account);
                    }}
                    disabled={switchChain.isPending}
                    key={account}
                  >
                    <span className="truncate">{account}</span>
                  </button>
                );
              })}
            </>
          ) : (
            <>
              {availableWalletProviders.map(({ provider, info }) => {
                return (
                  <button
                    className="flex items-center space-x-4 rounded bg-[#555] px-4 py-2 shadow-md hover:bg-[#777] disabled:opacity-50"
                    key={info.uuid}
                    onClick={() => {
                      void chooseProvider(provider);
                    }}
                    disabled={isConnecting}
                  >
                    <img src={info.icon} className="size-8" />
                    <span>{info.name}</span>
                  </button>
                );
              })}
              {window.ethereum ? (
                <button
                  className="flex items-center space-x-4 rounded bg-[#555] px-4 py-2 shadow-md hover:bg-[#777] disabled:opacity-50"
                  onClick={() => {
                    if (window.ethereum) {
                      void chooseProvider(window.ethereum);
                    }
                  }}
                  disabled={isConnecting}
                >
                  <Icon name="GlobeIcon" size={32} />
                  <span>Browser wallet</span>
                </button>
              ) : null}
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
