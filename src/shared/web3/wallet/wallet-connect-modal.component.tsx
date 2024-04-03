import { EIP1193Provider, createStore } from 'mipd';
import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { create as createModal, useModal } from '@ebay/nice-modal-react';
import { useMutation } from '@tanstack/react-query';

import { Icon, IdrissLogo, Modal } from 'shared/ui/components';

import { Hex, Wallet } from '../web3.types';
import { hexStringToNumber, toAddressWithValidChecksum } from '../web3.utils';

export const WalletConnectModal = createModal(() => {
  const modal = useModal();

  const connect = useMutation({
    mutationFn: async (provider: EIP1193Provider) => {
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });
      const chainId = await provider.request({ method: 'eth_chainId' });
      return { accounts, chainId };
    },
    onSuccess: ({ accounts }) => {
      // auto select account if there is only a single one
      if (accounts.length === 1 && accounts[0]) {
        chooseAccount(accounts[0]);
      }
    },
  });

  const availableAccounts = useMemo(() => {
    if (!connect.data) {
      return [];
    }

    return connect.data.accounts.map((account) => {
      return toAddressWithValidChecksum(account);
    });
  }, [connect.data]);

  const chosenProvider = connect.variables;

  const chooseAccount = useCallback(
    (account: Hex) => {
      if (!chosenProvider || !connect.data) {
        return modal.reject();
      }

      const wallet: Wallet = {
        account,
        provider: chosenProvider,
        chainId: hexStringToNumber(connect.data.chainId),
      };

      modal.resolve(wallet);
      modal.remove();
    },
    [chosenProvider, connect.data, modal],
  );

  const chooseProvider = useCallback(
    async (provider: EIP1193Provider) => {
      await connect.mutateAsync(provider);
    },
    [connect],
  );

  const walletProvidersStore = useMemo(() => {
    return createStore();
  }, []);

  const availableWalletProviders = useSyncExternalStore(
    walletProvidersStore.subscribe,
    walletProvidersStore.getProviders,
  );

  const providers = [...availableWalletProviders].sort((a, b) => {
    if (a.info.rdns === 'io.metamask') {
      return -1;
    }
    return 0;
  });

  const closeModalWithoutFinishing = useCallback(() => {
    modal.reject();
    modal.remove();
  }, [modal]);

  return (
    <Modal
      title={
        <div className="flex items-center space-x-2">
          <IdrissLogo size={24} />
          <p className="text-lg font-semibold">Connect wallet</p>
        </div>
      }
      onClose={closeModalWithoutFinishing}
      isOpened={modal.visible}
    >
      <div className="flex flex-col space-y-2">
        {providers.length === 0 && (
          <p>We couldn&apos;t find any wallet provider.</p>
        )}
        {chosenProvider ? (
          <>
            {availableAccounts.map((account) => {
              return (
                <button
                  className="flex items-center space-x-4 rounded bg-[#555] px-4 py-2 shadow-md hover:bg-[#777]"
                  onClick={() => {
                    chooseAccount(account);
                  }}
                  key={account}
                >
                  <span className="truncate">{account}</span>
                </button>
              );
            })}
          </>
        ) : (
          <>
            {providers.map(({ provider, info }) => {
              return (
                <button
                  className="flex items-center space-x-4 rounded bg-[#555] px-4 py-2 shadow-md hover:bg-[#777] disabled:opacity-50"
                  key={info.uuid}
                  onClick={() => {
                    void chooseProvider(provider);
                  }}
                  disabled={connect.isPending}
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
                disabled={connect.isPending}
              >
                <Icon name="GlobeIcon" size={32} />
                <span>Browser wallet</span>
              </button>
            ) : null}
          </>
        )}
      </div>
    </Modal>
  );
});
