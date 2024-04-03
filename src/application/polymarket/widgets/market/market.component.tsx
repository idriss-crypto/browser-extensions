import { useCallback, useEffect, useMemo, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { TickSize } from '@polymarket/clob-client';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { EIP1193Provider } from 'mipd';

import {
  CHAIN,
  createEthersProvider,
  useSwitchChain,
  useWallet,
} from 'shared/web3';
import {
  Chip,
  WidgetBase,
  CurrencyInput,
  IconButton,
  InputBase,
  Checkbox,
} from 'shared/ui/components';
import { sendMonitoringEvent } from 'shared/monitoring';

import { BuyClickedEvent, LoginClickedEvent } from '../../monitoring';
import { calculateTotalSharesForAmount } from '../../polymarket.library';
import {
  UnavailableButton,
  AccountNotFoundMessage,
  ActionButton,
  Progress,
  SomethingWentWrongMessage,
  SuccessButton,
  VoteButton,
} from '../../components';
import {
  useFunder,
  useRequestAuth,
  usePostOrder,
  useBase64Image,
  useTokenChance,
} from '../../hooks';
import { AccountNotFoundError } from '../../errors';

import { MarketForm, MarketProperties } from './market.types';
import { EMPTY_MARKET_FORM } from './market.constants';
import { marketFormSchema } from './market.schema';

export const Market = ({
  top,
  data,
  defaultValues,
  tokens,
  isAvailable,
  onRefresh,
}: MarketProperties) => {
  const { wallet, openConnectionModal } = useWallet();
  const funderQuery = useFunder();
  const imageQuery = useBase64Image({ url: data.image });
  const tokenChanceQuery = useTokenChance({
    tokenId: defaultValues?.selectedTokenId ?? '',
  });

  const balanceInDollars = useMemo(() => {
    if (!funderQuery.data) {
      return;
    }

    return Number(funderQuery.data.balance / 1_000_000);
  }, [funderQuery.data]);

  const { control, watch, handleSubmit } = useForm<MarketForm>({
    defaultValues: {
      amount: defaultValues?.amount ?? EMPTY_MARKET_FORM.amount,
      selectedTokenId:
        defaultValues?.selectedTokenId ?? EMPTY_MARKET_FORM.selectedTokenId,
    },
    resolver: zodResolver(marketFormSchema(balanceInDollars)),
    mode: 'onChange',
  });

  const [selectedTokenId, amount, termsAccepted] = watch([
    'selectedTokenId',
    'amount',
    'termsAccepted',
  ]);

  const selectedToken = useMemo(() => {
    return tokens.find((token) => {
      return token.token_id === selectedTokenId;
    });
  }, [tokens, selectedTokenId]);

  const potentialReturn = useMemo(() => {
    if (amount === 0) {
      return 0;
    }

    return Number(
      calculateTotalSharesForAmount(
        selectedToken?.book.asks ?? [],
        amount,
      ).toFixed(2),
    );
  }, [amount, selectedToken?.book.asks]);

  const potentialReturnPercentage = useMemo(() => {
    if (potentialReturn === 0) {
      return 0;
    }
    return Math.max(
      0,
      Number((((potentialReturn - amount) / amount) * 100).toFixed(2)),
    );
  }, [amount, potentialReturn]);

  const formReference = useRef<HTMLFormElement | null>(null);

  const requestAuth = useRequestAuth();
  const postOrder = usePostOrder({ conditionId: data.condition_id });
  const switchChain = useSwitchChain();

  const switchToPolygon = useCallback(
    (provider: EIP1193Provider) => {
      return switchChain.mutateAsync({
        walletProvider: provider,
        chainId: CHAIN.POLYGON.id,
      });
    },
    [switchChain],
  );

  const resetMutations = useCallback(() => {
    switchChain.reset();
    requestAuth.reset();
    postOrder.reset();
  }, [postOrder, requestAuth, switchChain]);

  useEffect(() => {
    if (postOrder.isSuccess) {
      setTimeout(resetMutations, 2000);
    }
  }, [postOrder.isSuccess, resetMutations]);

  const requestProvider = async () => {
    resetMutations();
    const wallet = await openConnectionModal();
    await switchToPolygon(wallet.provider);
  };

  const submit: SubmitHandler<MarketForm> = async (formValues) => {
    if (!wallet || !funderQuery.data || !selectedToken) {
      return;
    }
    resetMutations();

    void sendMonitoringEvent(
      new BuyClickedEvent({
        conditionId: data.condition_id,
        tokenId: formValues.selectedTokenId,
        amount: formValues.amount,
        funderAddress: funderQuery.data.address,
      }),
    );

    await switchToPolygon(wallet.provider);

    const ethersProvider = createEthersProvider(wallet.provider);
    const signer = ethersProvider.getSigner(wallet.account);
    const credentials = await requestAuth.mutateAsync(signer);

    postOrder.mutate({
      funderAddress: funderQuery.data.address,
      tickSize: data.minimum_tick_size as TickSize,
      negRisk: data.neg_risk,
      tokenID: formValues.selectedTokenId,
      amount: formValues.amount,
      credentials: {
        passphrase: credentials.passphrase,
        secret: credentials.secret,
        key: credentials.apiKey,
      },
      signer,
    });
  };

  const isBuyingPending =
    postOrder.isPending || requestAuth.isPending || switchChain.isPending;

  const isPolymarketAccountNotFoundError =
    Boolean(funderQuery.error) &&
    funderQuery.error instanceof AccountNotFoundError;

  const isOtherPolymarketAccountError =
    Boolean(funderQuery.error) &&
    !(funderQuery.error instanceof AccountNotFoundError);

  return (
    <WidgetBase
      className="absolute right-4 w-96 rounded-xl bg-polymarket-gray p-6 font-sans text-white shadow-lg"
      top={top}
    >
      <form ref={formReference} onSubmit={handleSubmit(submit)}>
        <div>
          <div className="flex items-center justify-between space-x-2">
            {imageQuery.data ? (
              <img src={imageQuery.data} className="w-10 rounded" alt="" />
            ) : null}
            <div
              className="line-clamp-2 text-base font-semibold"
              title={data.question}
            >
              {data.question}
            </div>
            {tokenChanceQuery.data ? (
              <Progress value={tokenChanceQuery.data} />
            ) : null}
          </div>
          <div className="mb-1.5 mt-8 flex items-center justify-between">
            <InputBase.Label label="Outcome" />
            <IconButton
              className="border border-[#2c3f4f] bg-transparent"
              iconProps={{ name: 'SymbolIcon', size: 16 }}
              onClick={() => {
                if (wallet) {
                  void funderQuery.refetch();
                }
                onRefresh();
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Controller
              control={control}
              name="selectedTokenId"
              render={({ field }) => {
                return (
                  <>
                    {tokens.map((token) => {
                      const isActive = field.value === token.token_id;
                      return (
                        <VoteButton
                          isActive={isActive}
                          outcome={token.outcome}
                          key={token.token_id}
                          onClick={() => {
                            field.onChange(token.token_id);
                          }}
                          disabled={isBuyingPending}
                        >
                          {token.outcome}
                        </VoteButton>
                      );
                    })}
                  </>
                );
              }}
            />
          </div>
          <div className="mt-4">
            <Controller
              control={control}
              name="amount"
              render={({ field, fieldState }) => {
                return (
                  <CurrencyInput
                    value={field.value}
                    onChange={field.onChange}
                    inputBaseProps={{
                      errorMessage: fieldState.error?.message,
                      renderLabel: () => {
                        return (
                          <div className="mb-1.5 flex items-center justify-between">
                            <InputBase.Label label="Amount" />
                            {typeof balanceInDollars === 'number' ? (
                              <Chip className="bg-[#2C3F4F]">
                                Balance ${balanceInDollars.toFixed(2)}
                              </Chip>
                            ) : null}
                          </div>
                        );
                      },
                    }}
                    placeholder="$0"
                    changeBy={10}
                    decimalScale={6}
                  />
                );
              }}
            />
          </div>
          <Controller
            control={control}
            name="termsAccepted"
            render={({ field }) => {
              return (
                <div className="mt-4 flex items-center space-x-2">
                  <Checkbox value={field.value} onChange={field.onChange} />
                  <p className="text-sm">
                    I agree to{' '}
                    <a
                      href="#"
                      target="_blank"
                      className="text-[#2D9CDB]"
                      rel="noopener noreferrer"
                    >
                      Terms of Use
                    </a>
                  </p>
                </div>
              );
            }}
          />
          {/* TODO: this could be nicer */}
          <div className="mt-4">
            {isAvailable ? (
              postOrder.isSuccess ? (
                <SuccessButton />
              ) : wallet ? (
                wallet.chainId === CHAIN.POLYGON.id ? (
                  <ActionButton
                    type="submit"
                    loading={isBuyingPending || switchChain.isPending}
                    disabled={!termsAccepted}
                  >
                    Buy
                  </ActionButton>
                ) : (
                  <ActionButton
                    type="button"
                    onClick={() => {
                      void switchToPolygon(wallet.provider);
                    }}
                    loading={switchChain.isPending}
                  >
                    Switch to Polygon
                  </ActionButton>
                )
              ) : (
                <ActionButton
                  loading={funderQuery.isLoading}
                  onClick={() => {
                    void sendMonitoringEvent(
                      new LoginClickedEvent({
                        conditionId: data.condition_id,
                        question: data.question,
                      }),
                    );

                    void requestProvider();
                  }}
                >
                  Connect wallet
                </ActionButton>
              )
            ) : (
              <UnavailableButton />
            )}
          </div>
          <div className="mt-4 flex items-center justify-between text-base font-normal">
            <span className="text-[#858D92]">Potential return</span>
            <span className="font-semibold text-green-400">
              ${potentialReturn} ({potentialReturnPercentage}%)
            </span>
          </div>
          {isPolymarketAccountNotFoundError ? (
            <AccountNotFoundMessage onSwitchWallet={requestProvider} />
          ) : null}
          {(isOtherPolymarketAccountError || switchChain.error) ??
          requestAuth.error ??
          postOrder.error ? (
            <SomethingWentWrongMessage
              onRetry={() => {
                return formReference.current?.requestSubmit();
              }}
              onSwitchWallet={requestProvider}
            />
          ) : null}
        </div>
      </form>
    </WidgetBase>
  );
};
