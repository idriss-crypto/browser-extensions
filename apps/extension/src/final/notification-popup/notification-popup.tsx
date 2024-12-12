import { useState } from 'react';

import { useNotification } from 'shared/ui';
import { onWindowMessage, SWAP_EVENT } from 'shared/messaging';
import { SwapData } from 'application/trading-copilot';

import { TradingCopilotToast, TradingCopilotDialog } from './components';

export const NotificationPopup = () => {
  const [dialogs, setDialogs] = useState<SwapData[]>([]);
  const [activeDialogHash, setActiveDialogHash] = useState<string | null>(null);

  const activeDialogData = dialogs.find((dialogData) => {
    return dialogData.transactionHash === activeDialogHash;
  });
  const notification = useNotification();

  onWindowMessage(SWAP_EVENT, (data: SwapData) => {
    setDialogs([...dialogs, data]);
    // TODO: temporary for testing, we need to fix openDialog function
    setActiveDialogHash(data.transactionHash);

    notification.show(
      <TradingCopilotToast toast={data} openDialog={openDialog} />,
      'bottom-right',
      data.transactionHash,
    );
  });

  const openDialog = (dialogHash: string) => {
    setActiveDialogHash(dialogHash);
  };

  const closeDialog = () => {
    setActiveDialogHash(null);
  };

  if (!activeDialogHash || activeDialogData === undefined) {
    return null;
  }

  return (
    <TradingCopilotDialog dialog={activeDialogData} closeDialog={closeDialog} />
  );
};
