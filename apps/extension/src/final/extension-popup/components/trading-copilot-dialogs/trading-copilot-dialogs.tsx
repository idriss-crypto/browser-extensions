import { Button } from '@idriss-xyz/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Icon as IdrissIcon } from '@idriss-xyz/ui/icon';
import { IconButton } from '@idriss-xyz/ui/icon-button';
import { NumericInput } from '@idriss-xyz/ui/numeric-input';

import { Closable, Icon, LazyImage } from 'shared/ui';
import { useCommandQuery } from 'shared/messaging';
import { GetEnsInfoCommand } from 'application/trading-copilot';

import {
  TradingCopilotDialogProperties,
  TradingCopilotDialogsProperties,
  TradingCopilotFormValues,
} from './trading-copilot-dialogs.types';

const EMPTY_FORM: TradingCopilotFormValues = {
  amount: '',
};

const exampleTradingCopilotDialogs = [
  {
    uuid: 'dialog01',
    details: {
      name: 'vitalik.eth',
      amount: 150,
      crypto: 'ETH',
      when: '15 mins ago',
      title: 'Trading copilot',
    },
    user: {
      balance: 200,
      crypto: 'ETH',
    },
    id: 'dialog1',
  },
  {
    uuid: 'dialog02',
    details: {
      name: 'vitalikk.eth',
      amount: 300,
      crypto: 'ETH',
      when: '30 mins ago',
      title: 'Trading copilot',
    },
    user: {
      balance: 200,
      crypto: 'ETH',
    },
    id: 'dialog2',
  },
];

export const TradingCopilotDialogs = ({
  activeDialogId,
  closeDialog,
}: TradingCopilotDialogsProperties) => {
  const activeDialog = exampleTradingCopilotDialogs.find((dialog) => {
    return dialog.id === activeDialogId;
  });

  if (!activeDialog) {
    return;
  }

  return (
    <>
      {exampleTradingCopilotDialogs.map((dialog) => {
        return (
          <TradingCopilotDialog
            key={dialog.uuid}
            dialog={dialog}
            activeDialogId={activeDialogId}
            closeDialog={closeDialog}
          />
        );
      })}
    </>
  );
};

const TradingCopilotDialog = ({
  dialog: { details, user, id },
  activeDialogId,
  closeDialog,
}: TradingCopilotDialogProperties) => {
  const form = useForm<TradingCopilotFormValues>({
    defaultValues: EMPTY_FORM,
  });

  const avatarQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: details.name,
      infoKey: 'avatar',
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (id !== activeDialogId) {
    return;
  }

  return (
    <Closable
      className="fixed left-0 top-0 z-portal size-full bg-neutralGreen-900/50"
      hideCloseButton
    >
      <div className="flex size-full items-center justify-center">
        <div className="flex w-[400px] flex-col gap-y-5 rounded-lg bg-white p-5">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-heading4 text-neutral-900">{details.title}</h1>
            <IconButton
              intent="tertiary"
              size="medium"
              iconName="X"
              onClick={closeDialog}
            />
          </div>
          <div className="flex flex-row gap-2">
            <LazyImage
              src={avatarQuery.data}
              className="size-12 rounded-full"
              fallbackComponent={
                <Icon size={48} name="PersonIcon" className="rounded-full" />
              }
            />
            <div className="flex flex-col">
              <p className="text-label3 text-neutralGreen-900">
                {details.name}{' '}
                <span className="text-body3 text-neutral-600">
                  purchased {details.amount} {details.crypto}
                </span>
              </p>
              <p className="text-label4 font-normal text-mint-700">
                {details.when}
              </p>
            </div>
          </div>
          <form className="pb-4">
            <div className="flex flex-row items-center justify-between">
              <label
                htmlFor="cryptoAmount"
                className="block text-label4 text-neutralGreen-700"
              >
                Amount
              </label>
              <p className="text-body6 text-neutral-500">
                Balance: {user.balance} {user.crypto}
              </p>
            </div>
            <Controller
              control={form.control}
              name="amount"
              render={({ field: { value, onChange } }) => {
                return (
                  <span className="relative mt-1 flex flex-row">
                    <NumericInput
                      value={value}
                      placeholder="ETH"
                      onChange={onChange}
                      className="ps-[60px] text-right"
                    />
                    <IdrissIcon
                      size={24}
                      name="Eth"
                      className="pointer-events-none absolute start-0 top-1/2 h-full w-[48px] -translate-y-1/2 border-r border-neutral-200 px-3 text-neutral-700"
                    />
                  </span>
                );
              }}
            />
          </form>
          <div>
            <Button intent="primary" size="medium" className="w-full">
              BUY
            </Button>
          </div>
        </div>
      </div>
    </Closable>
  );
};