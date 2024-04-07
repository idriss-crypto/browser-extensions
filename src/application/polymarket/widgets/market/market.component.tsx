import { useEffect, useMemo, useRef } from 'react';
import { TickSize } from '@polymarket/clob-client';
import { Controller, SubmitHandler } from 'react-hook-form';

import { CHAIN } from 'shared/web3';
import {
  Chip,
  WidgetBase,
  CurrencyInput,
  IconButton,
  InputBase,
} from 'shared/ui/components';
import { sendMonitoringEvent } from 'shared/monitoring';

import { MarketForm } from '../../polymarket.types';
import { useMarketForm, useOrderPlacer, useUser } from '../../hooks';
import {
  BuyClickedEvent,
  LoginClickedEvent,
  OrderSucceededEvent,
} from '../../monitoring';
import { calculateTotalSharesForAmount } from '../../polymarket.library';
import {
  UnavailableButton,
  AccountNotFoundMessage,
  ActionButton,
  Progress,
  SomethingWentWrongMessage,
  SuccessButton,
  VoteButton,
  UsdcNotAllowedMessage,
} from '../../components';

import { MarketProperties } from './market.types';

export const Market = ({
  top,
  data,
  defaultValues,
  tokens,
  isAvailable,
  imageUrl,
  chance,
  onRefresh,
}: MarketProperties) => {
  const user = useUser();
  const orderPlacer = useOrderPlacer({
    onSuccess: (parameters) => {
      void sendMonitoringEvent(
        new OrderSucceededEvent({
          conditionId: data.condition_id,
          tokenId: parameters.orderDetails.tokenId,
          amount: parameters.orderDetails.amount,
          funderAddress: parameters.funderAddress,
        }),
      );
    },
  });

  const { control, amount, selectedTokenId, handleSubmit } = useMarketForm({
    defaultValues,
    availableBalance: user.safeWalletDetails?.balance ?? 0,
  });

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

  useEffect(() => {
    if (orderPlacer.isPlaced) {
      setTimeout(orderPlacer.reset, 2000);
    }
  }, [orderPlacer.isPlaced, orderPlacer.reset]);

  const submit: SubmitHandler<MarketForm> = async (formValues) => {
    if (!user.wallet || !user.safeWalletDetails) {
      return;
    }

    await orderPlacer.place({
      wallet: user.wallet,
      funderAddress: user.safeWalletDetails.address,
      orderDetails: {
        minimumTickSize: data.minimum_tick_size as TickSize,
        negRisk: data.neg_risk,
        amount: formValues.amount,
        tokenId: formValues.selectedTokenId,
      },
    });
  };

  return (
    <WidgetBase
      className="absolute rounded-xl bg-polymarket-gray font-sans text-white"
      top={top}
    >
      <form ref={formReference} onSubmit={handleSubmit(submit)}>
        <div>
          <div className="flex items-center justify-between space-x-2">
            {imageUrl ? (
              <img src={imageUrl} className="w-10 rounded" alt="" />
            ) : null}
            <div
              className="line-clamp-2 text-base font-semibold"
              title={data.question}
            >
              {data.question}
            </div>
            <Progress value={chance} />
          </div>
          <div className="mb-1.5 mt-8 flex items-center justify-between">
            <InputBase.Label label="Outcome" />
            <IconButton
              className="border border-[#2c3f4f] bg-transparent"
              iconProps={{ name: 'SymbolIcon', size: 16 }}
              onClick={onRefresh}
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
                          disabled={orderPlacer.isPlacing}
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
                            <Chip className="bg-[#2C3F4F]">
                              Balance $
                              {user.safeWalletDetails?.balance.toFixed(2) ?? 0}
                            </Chip>
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
          {/* TODO: this could be nicer */}
          <div className="mt-4">
            {isAvailable ? (
              orderPlacer.isPlaced ? (
                <SuccessButton />
              ) : user.wallet ? (
                user.wallet.chainId === CHAIN.POLYGON.id ? (
                  <ActionButton
                    type="submit"
                    loading={orderPlacer.isPlacing || user.isSigning}
                    disabled={user.isSigningError}
                    onClick={() => {
                      void sendMonitoringEvent(
                        new BuyClickedEvent({
                          conditionId: data.condition_id,
                          tokenId: selectedTokenId,
                          amount: amount,
                        }),
                      );
                    }}
                  >
                    Buy
                  </ActionButton>
                ) : (
                  <ActionButton
                    type="button"
                    onClick={() => {
                      if (!user.wallet?.provider) {
                        return;
                      }
                      void user.switchToPolygon(user.wallet.provider);
                    }}
                    loading={user.isSigning}
                  >
                    Switch to Polygon
                  </ActionButton>
                )
              ) : (
                <ActionButton
                  loading={user.isSigning}
                  onClick={() => {
                    void sendMonitoringEvent(
                      new LoginClickedEvent({
                        conditionId: data.condition_id,
                        question: data.question,
                      }),
                    );

                    void user.signIn();
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
          {user.isSigning ||
          !user.wallet ||
          user.wallet.chainId !== CHAIN.POLYGON.id ? null : (
            <>
              {user.hasPolymarketAccount ? (
                user.hasUsdcAllowed ? null : (
                  <UsdcNotAllowedMessage onSwitchWallet={user.signIn} />
                )
              ) : (
                <AccountNotFoundMessage onSwitchWallet={user.signIn} />
              )}
              {user.isSigningError ?? orderPlacer.isError ? (
                <SomethingWentWrongMessage
                  onRetry={() => {
                    return formReference.current?.requestSubmit();
                  }}
                  onSwitchWallet={user.signIn}
                />
              ) : null}
            </>
          )}
        </div>
      </form>
    </WidgetBase>
  );
};
