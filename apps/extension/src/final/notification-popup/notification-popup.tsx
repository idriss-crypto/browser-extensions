import { useEffect, useState } from 'react';

import { useNotification } from 'shared/ui';

import { TradingCopilotToast, TradingCopilotDialog } from './components';

const exampleTradingCopilotToasts = [
  {
    details: {
      name: 'vitalik.eth',
      amount: 150,
      crypto: 'ETH',
      when: '20 mins ago',
    },
    dialogId: 'dialog01',
  },
  {
    details: {
      name: 'levertz.eth',
      amount: 45,
      crypto: 'ETH',
      when: '33 mins ago',
    },
    dialogId: 'dialog02',
  },
  {
    details: {
      name: 'vitalikk.eth',
      amount: 76,
      crypto: 'ETH',
      when: '52 mins ago',
    },
    dialogId: 'dialog03',
  },
];

const exampleTradingCopilotDialogs = [
  {
    details: {
      name: 'vitalik.eth',
      amount: 150,
      crypto: 'ETH',
      when: '20 mins ago',
    },
    user: {
      balance: 200,
      crypto: 'ETH',
    },
    id: 'dialog01',
  },
  {
    details: {
      name: 'levertz.eth',
      amount: 45,
      crypto: 'ETH',
      when: '33 mins ago',
    },
    user: {
      balance: 200,
      crypto: 'ETH',
    },
    id: 'dialog02',
  },
  {
    details: {
      name: 'vitalikk.eth',
      amount: 76,
      crypto: 'ETH',
      when: '52 mins ago',
    },
    user: {
      balance: 200,
      crypto: 'ETH',
    },
    id: 'dialog03',
  },
];

export const NotificationPopup = () => {
  const [activeDialogId, setActiveDialogId] = useState<string | null>(null);
  const activeDialogData = exampleTradingCopilotDialogs.find((dialogData) => {
    return dialogData.id === activeDialogId;
  });
  const notification = useNotification();

  const openDialog = (dialogId: string) => {
    setActiveDialogId(dialogId);
  };

  const closeDialog = () => {
    setActiveDialogId(null);
  };

  useEffect(() => {
    exampleTradingCopilotToasts.map((toast) => {
      notification.show(
        <TradingCopilotToast
          toast={toast.details}
          dialogId={toast.dialogId}
          openDialog={openDialog}
        />,
      );
    });
  }, [notification]);

  if (!activeDialogId || activeDialogData === undefined) {
    return null;
  }

  return (
    <TradingCopilotDialog dialog={activeDialogData} closeDialog={closeDialog} />
  );
};
