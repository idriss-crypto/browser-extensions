import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { useModal } from '@ebay/nice-modal-react';
import { createStore } from 'mipd';

import { createContextHook } from 'shared/ui';

import { Hex, Wallet } from '../types';
import { hexToDecimal, toAddressWithValidChecksum } from '../utils';
import { WalletConnectModal } from '../components';
import { WalletStorage } from '../storage';

interface WalletContextValue {
  wallet?: Wallet;
  openConnectionModal: () => Promise<Wallet>;
  isConnectionModalOpened: boolean;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

interface Properties {
  children: ReactNode;
  disabledWalletsRdns: string[];
}

export const WalletContextProvider = ({
  children,
  disabledWalletsRdns,
}: Properties) => {
  const walletConnectModal = useModal(WalletConnectModal, {
    disabledWalletsRdns,
  });

  const [wallet, setWallet] = useState<Wallet>();
  const walletProvidersStore = useMemo(() => {
    return createStore();
  }, []);

  const availableWalletProviders = useSyncExternalStore(
    walletProvidersStore.subscribe,
    walletProvidersStore.getProviders,
  );

  useEffect(() => {
    if (wallet ?? availableWalletProviders.length === 0) {
      return;
    }

    const storedWallet = WalletStorage.get();
    if (!storedWallet) {
      return;
    }

    const foundProvider =
      storedWallet.providerRdns === 'browser'
        ? { provider: window.ethereum, info: { rdns: 'browser' } }
        : availableWalletProviders.find((provider) => {
            return provider.info.rdns === storedWallet.providerRdns;
          });

    const connectedProvider = foundProvider?.provider;
    if (!foundProvider || !connectedProvider) {
      return;
    }

    const connectToStoredWallet = async () => {
      const accounts = await connectedProvider.request({
        method: 'eth_accounts',
      });

      if (
        !accounts
          .map((account) => {
            return toAddressWithValidChecksum(account);
          })
          .includes(storedWallet.account)
      ) {
        return;
      }

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      const chainId = await connectedProvider.request({
        method: 'eth_chainId',
      });

      setWallet({
        providerRdns: foundProvider.info.rdns,
        provider: connectedProvider,
        account: storedWallet.account,
        chainId: hexToDecimal(chainId),
      });
    };

    void connectToStoredWallet();
  }, [availableWalletProviders, availableWalletProviders.length, wallet]);

  useEffect(() => {
    const onAccountsChanged = () => {
      setWallet(undefined);
      WalletStorage.clear();
    };
    wallet?.provider.on('accountsChanged', onAccountsChanged);

    return () => {
      wallet?.provider.removeListener('accountsChanged', onAccountsChanged);
    };
  }, [wallet?.provider]);

  useEffect(() => {
    const onChainChanged = (chainId: Hex) => {
      setWallet((previous) => {
        if (!previous) {
          return;
        }

        return { ...previous, chainId: hexToDecimal(chainId) };
      });
    };
    wallet?.provider.on('chainChanged', onChainChanged);

    return () => {
      wallet?.provider.removeListener('chainChanged', onChainChanged);
    };
  }, [wallet?.provider]);

  const openConnectionModal = useCallback(async () => {
    try {
      const resolvedWallet = (await walletConnectModal.show({
        disabledWalletsRdns,
      })) as Wallet;
      setWallet(resolvedWallet);
      return resolvedWallet;
    } catch (error) {
      setWallet(undefined);
      throw error;
    }
  }, [disabledWalletsRdns, walletConnectModal]);

  const contextValue: WalletContextValue = useMemo(() => {
    return {
      wallet,
      openConnectionModal,
      isConnectionModalOpened: walletConnectModal.visible,
    };
  }, [openConnectionModal, wallet, walletConnectModal.visible]);

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = createContextHook(WalletContext);
