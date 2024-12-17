import { Button } from '@idriss-xyz/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Icon as IdrissIcon } from '@idriss-xyz/ui/icon';
import { IconButton } from '@idriss-xyz/ui/icon-button';
import { NumericInput } from '@idriss-xyz/ui/numeric-input';
import { useWallet } from '@idriss-xyz/wallet-connect';
import { formatEther } from 'viem';

import { Closable, Icon, LazyImage } from 'shared/ui';
import { useCommandMutation, useCommandQuery } from 'shared/messaging';
import {
  GetEnsInfoCommand,
  GetEnsNameCommand,
} from 'application/trading-copilot';
import { getFormattedTimeDifference } from 'shared/utils';
import { CHAIN, roundToSignificantFigures } from 'shared/web3';

import { GetQuoteCommand } from '../../commands/get-quote';
import { GetEnsBalanceCommand } from '../../commands/get-ens-balance';
import { QuotePayload } from '../../types';

import {
  Properties,
  TradingCopilotDialogFormValues,
  TradingCopilotDialogContentProperties,
  WalletBalanceProperties,
  TradeValueProperties,
} from './trading-copilot-dialog.types';

const EMPTY_FORM: TradingCopilotDialogFormValues = {
  amount: '',
};

export const TradingCopilotDialog = ({ dialog, closeDialog }: Properties) => {
  const ensNameQuery = useCommandQuery({
    command: new GetEnsNameCommand({
      address: dialog.from,
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (ensNameQuery.isFetching) {
    return;
  }

  return (
    <TradingCopilotDialogContent
      dialog={dialog}
      closeDialog={closeDialog}
      userName={ensNameQuery.data ?? dialog.from}
    />
  );
};

const TradingCopilotDialogContent = ({
  dialog,
  userName,
  closeDialog,
}: TradingCopilotDialogContentProperties) => {
  const getQuote = useCommandMutation(GetQuoteCommand);
  const { wallet, isConnectionModalOpened, openConnectionModal } = useWallet();

  const { handleSubmit, control } = useForm<TradingCopilotDialogFormValues>({
    defaultValues: EMPTY_FORM,
  });

  const handleGetQuote = async (payload: QuotePayload) => {
    return await getQuote.mutateAsync(payload);
  };

  const onSubmit = async (data: TradingCopilotDialogFormValues) => {
    if (!wallet) {
      return;
    }

    const payload = {
      amount: Number(data.amount),
      destinationChain: 8453,
      fromAddress: wallet.account,
      destinationToken: dialog.tokenIn.address,
      originToken: '0x0000000000000000000000000000000000000000',
      originChain: CHAIN[dialog.tokenIn.network].id,
    };

    const payloadData = await handleGetQuote(payload);

    return console.log(payloadData);
  };

  const avatarQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: userName,
      infoKey: 'avatar',
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });

  return (
    <Closable
      className="fixed left-0 top-0 z-portal size-full bg-black/50"
      hideCloseButton
    >
      <div className="flex size-full items-center justify-center">
        <div className="flex w-[400px] flex-col gap-y-5 rounded-lg border border-black/20 bg-white p-5">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-heading4 text-neutral-900">Copy trade</h1>
            <IconButton
              intent="tertiary"
              size="medium"
              iconName="X"
              onClick={closeDialog}
            />
          </div>
          <div className="grid grid-cols-[48px,1fr] gap-2">
            <LazyImage
              src={avatarQuery.data}
              className="size-12 rounded-full border border-neutral-400 bg-neutral-200"
              fallbackComponent={
                <div className="flex size-12 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200">
                  <Icon
                    size={30}
                    name="PersonIcon"
                    className="text-neutral-500"
                  />
                </div>
              }
            />
            <div className="flex w-full flex-col">
              <p className="text-label3 text-neutral-900">
                {userName}{' '}
                <span className="text-body3 text-neutral-600">
                  got {roundToSignificantFigures(dialog.tokenIn.amount, 2)}{' '}
                  {dialog.tokenIn.symbol}
                </span>{' '}
                {wallet ? (
                  <TradingCopilotTradeValue wallet={wallet} dialog={dialog} />
                ) : null}
              </p>
              <p className="text-body6 text-mint-700">
                {getFormattedTimeDifference(dialog.timestamp)} ago
              </p>
            </div>
          </div>
          <form className="mt-1" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row items-center justify-between">
              <label
                htmlFor="cryptoAmount"
                className="block text-label4 text-neutralGreen-700"
              >
                Amount
              </label>
              {wallet ? <TradingCopilotWalletBalance wallet={wallet} /> : null}
            </div>
            <Controller
              control={control}
              name="amount"
              render={({ field: { value, onChange } }) => {
                return (
                  <span className="relative mt-2 flex">
                    <NumericInput
                      value={value}
                      placeholder="ETH"
                      onChange={onChange}
                      className="ps-[60px] text-right"
                    />
                    <div className="pointer-events-none absolute start-0 top-1/2 flex h-full w-12 -translate-y-1/2 items-center justify-center after:absolute after:right-0 after:top-1.5 after:h-[calc(100%_-_12px)] after:w-px after:bg-neutral-200">
                      <span className="flex size-6 items-center justify-center rounded-full bg-neutral-200">
                        <IdrissIcon
                          size={18}
                          name="Eth"
                          className="text-neutral-700"
                        />
                      </span>
                    </div>
                  </span>
                );
              }}
            />
            <div className="mt-5">
              {wallet ? (
                <Button
                  intent="primary"
                  size="medium"
                  className="w-full"
                  type="submit"
                  loading={getQuote.isPending}
                  disabled={getQuote.isError}
                >
                  BUY {dialog.tokenIn.symbol}
                </Button>
              ) : (
                <Button
                  intent="primary"
                  size="medium"
                  onClick={openConnectionModal}
                  className="w-full"
                  loading={isConnectionModalOpened}
                >
                  LOG IN
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Closable>
  );
};

const TradingCopilotWalletBalance = ({ wallet }: WalletBalanceProperties) => {
  const balanceQuery = useCommandQuery({
    command: new GetEnsBalanceCommand({
      address: wallet?.account ?? '',
      blockTag: 'safe',
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (!balanceQuery.data) {
    return;
  }

  return (
    <p className="text-body6 text-neutral-500">
      Balance: {roundToSignificantFigures(Number(balanceQuery.data), 2)} ETH
    </p>
  );
};

const TradingCopilotTradeValue = ({ wallet, dialog }: TradeValueProperties) => {
  const payload = {
    amount: dialog.tokenIn.amount,
    destinationChain: CHAIN[dialog.tokenIn.network].id,
    fromAddress: wallet.account,
    destinationToken: dialog.tokenIn.address,
    originToken: '0x0000000000000000000000000000000000000000',
    originChain: 8453,
  };

  const quoteQuery = useCommandQuery({
    command: new GetQuoteCommand(payload),
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (!quoteQuery.data) {
    return;
  }

  console.log(quoteQuery.data);

  const tradeValueInWei = BigInt(quoteQuery.data.estimate.toAmount);
  const tradeValueInEth = Number(formatEther(tradeValueInWei));

  return (
    <span className="text-body6 text-neutral-500">
      ({roundToSignificantFigures(tradeValueInEth, 2)} ETH)
    </span>
  );
};
