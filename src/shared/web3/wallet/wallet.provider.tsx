import { EIP1193Provider } from 'mipd';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { useModal } from 'shared/ui/hooks';

import { toAddressWithValidChecksum } from '../web3.utils';
import { Hex } from '../web3.types';

import { WalletContext, WalletContextValue } from './wallet.context';

interface Properties {
  children: ReactNode;
}

export const WalletContextProvider = ({ children }: Properties) => {
  const walletConnectModal = useModal();
  const [availableAccounts, setAvailableAccounts] = useState<Hex[]>([]);

  const [chosenAccount, setChosenAccount] = useState<Hex>();
  const [chosenProvider, setChosenProvider] = useState<EIP1193Provider>();

  const connect = useMutation({
    mutationFn: (provider: EIP1193Provider) => {
      return provider.request({
        method: 'eth_requestAccounts',
      });
    },
    onSuccess: (accounts, provider) => {
      setChosenProvider(provider);
      setAvailableAccounts(
        accounts.map((account) => {
          return toAddressWithValidChecksum(account);
        }),
      );
      // auto select account if there is only a single one
      if (accounts.length === 1) {
        setChosenAccount(toAddressWithValidChecksum(accounts[0] ?? '0x'));
      }
    },
  });

  const openConnectionModal = useCallback(() => {
    setChosenProvider(undefined);
    setChosenAccount(undefined);
    walletConnectModal.open();
  }, [walletConnectModal]);

  const closeConnectionModal = useCallback(() => {
    // user closed modal after choosing provider but didn't choose account
    if (!chosenAccount) {
      setChosenAccount(undefined);
    }
    walletConnectModal.close();
  }, [chosenAccount, walletConnectModal]);

  const chooseProvider = useCallback(
    async (provider: EIP1193Provider) => {
      await connect.mutateAsync(provider);
    },
    [connect],
  );

  useEffect(() => {
    if (chosenAccount && walletConnectModal.isOpened) {
      closeConnectionModal();
    }
  }, [chosenAccount, closeConnectionModal, walletConnectModal.isOpened]);

  const contextValue: WalletContextValue = useMemo(() => {
    return {
      account: chosenAccount,
      provider: chosenProvider,
      availableAccounts,
      isConnecting: connect.isPending,
      isModalOpened: walletConnectModal.isOpened,
      chooseAccount: setChosenAccount,
      openConnectionModal,
      closeConnectionModal,
      chooseProvider,
    };
  }, [
    availableAccounts,
    chooseProvider,
    chosenAccount,
    chosenProvider,
    closeConnectionModal,
    connect.isPending,
    openConnectionModal,
    walletConnectModal.isOpened,
  ]);

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
