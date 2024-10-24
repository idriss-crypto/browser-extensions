import { useCallback } from 'react';

import { Button } from 'shared/ui';
import { useWallet } from 'shared/web3';

interface Properties {
  onClick?: () => void;
}

export const ConnectWalletButton = ({ onClick }: Properties) => {
  const { isConnectionModalOpened, openConnectionModal } = useWallet();

  const handleClick = useCallback(() => {
    void openConnectionModal();
    onClick?.();
  }, [onClick, openConnectionModal]);

  return (
    <Button
      className="bg-idriss-primary-500 hover:bg-idriss-primary-400 w-full rounded-md py-2 text-base font-medium text-white shadow-sm"
      loading={isConnectionModalOpened}
      onClick={handleClick}
    >
      Log In
    </Button>
  );
};
