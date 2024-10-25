import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CHAIN } from 'shared/web3';
import {
  Chip,
  WidgetBase,
  CurrencyInput,
  IconButton,
  InputBase,
} from 'shared/ui';

import { EMPTY_MARKET_FORM, SCENARIO } from '../constants';
import { marketFormSchema } from '../schema';
import {
  EnhancedToken,
  MarketData,
  MarketFormValues,
  TickSize,
} from '../types';
import { useOrderPlacer, useUser } from '../hooks';
import { calculateTotalSharesForAmount } from '../utils';
import {
  UnavailableButton,
  ActionButton,
  Progress,
  OrderPlacerError,
  SuccessButton,
  VoteButton,
  UserError,
} from '../components';

interface Properties {
  data: Pick<MarketData, 'minimum_tick_size' | 'neg_risk' | 'question'>;
  tokens: EnhancedToken[];
  defaultValues?: Partial<MarketFormValues>;
  onRefresh: () => void;
  top: number;
  isAvailable: boolean;
  imageUrl: string;
  chance: number;
}

export const Market = ({
  top,
  data,
  defaultValues,
  tokens,
  isAvailable,
  imageUrl,
  chance,
  onRefresh,
}: Properties) => {
  const user = useUser();
  const orderPlacer = useOrderPlacer();

  const marketForm = useForm<MarketFormValues>({
    defaultValues: {
      amount: defaultValues?.amount ?? EMPTY_MARKET_FORM.amount,
      selectedTokenId:
        defaultValues?.selectedTokenId ?? EMPTY_MARKET_FORM.selectedTokenId,
    },
    resolver: zodResolver(
      marketFormSchema(Number(user.safeWalletDetails?.balance ?? 0)),
    ),
    mode: 'onChange',
  });

  const [selectedTokenId, amount] = marketForm.watch([
    'selectedTokenId',
    'amount',
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

  const scenario = useMemo(() => {
    if (!isAvailable) {
      return SCENARIO.BETTING_NOT_AVAILABLE;
    }

    if (!user.wallet) {
      return SCENARIO.WALLET_NOT_CONNECTED;
    }

    if (user.wallet.chainId !== CHAIN.POLYGON.id) {
      return SCENARIO.WRONG_CHAIN;
    }

    if (orderPlacer.isPlaced) {
      return SCENARIO.BET_PLACED;
    }

    return SCENARIO.READY_TO_BET;
  }, [isAvailable, orderPlacer.isPlaced, user.wallet]);

  const scenarioToActionButton = useMemo(() => {
    return {
      [SCENARIO.BET_PLACED]: <SuccessButton />,
      [SCENARIO.READY_TO_BET]: (
        <ActionButton
          type="submit"
          loading={orderPlacer.isPlacing || user.isSigning}
          disabled={user.isSigningError}
        >
          Buy
        </ActionButton>
      ),
      [SCENARIO.WRONG_CHAIN]: (
        <ActionButton
          type="button"
          onClick={() => {
            if (!user.wallet) {
              return;
            }

            void user.switchToPolygon(user.wallet);
          }}
          loading={user.isSigning}
        >
          Switch to Polygon
        </ActionButton>
      ),
      [SCENARIO.WALLET_NOT_CONNECTED]: (
        <ActionButton loading={user.isSigning} onClick={user.signIn}>
          Log In
        </ActionButton>
      ),
      [SCENARIO.BETTING_NOT_AVAILABLE]: <UnavailableButton />,
    };
  }, [orderPlacer.isPlacing, user]);

  const submit: SubmitHandler<MarketFormValues> = useCallback(
    async (formValues) => {
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
    },
    [
      data.minimum_tick_size,
      data.neg_risk,
      orderPlacer,
      user.safeWalletDetails,
      user.wallet,
    ],
  );

  const retry = useCallback(() => {
    formReference.current?.requestSubmit();
  }, []);

  useEffect(() => {
    if (orderPlacer.isPlaced) {
      setTimeout(orderPlacer.reset, 4000);
    }
  }, [orderPlacer.isPlaced, orderPlacer.reset]);

  return (
    <div className="absolute right-4" style={{ top }}>
      <WidgetBase
        className="z-10 w-96 rounded-xl bg-[#1D2B39] font-sans text-white"
        closeButtonClassName="hover:enabled:bg-[#5f7282]"
      >
        <form ref={formReference} onSubmit={marketForm.handleSubmit(submit)}>
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
                className="border border-[#2c3f4f] bg-transparent hover:enabled:bg-[#53535a] active:enabled:bg-[#92a5b5]"
                iconProps={{ name: 'SymbolIcon', size: 16 }}
                onClick={onRefresh}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Controller
                control={marketForm.control}
                name="selectedTokenId"
                render={({ field }) => {
                  return (
                    <>
                      {tokens.map((token, index) => {
                        const isActive = field.value === token.token_id;
                        return (
                          <VoteButton
                            isActive={isActive}
                            tokenIndex={index}
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
                control={marketForm.control}
                name="amount"
                render={({ field, fieldState }) => {
                  return (
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      iconButtonClassName="bg-[#2c3f4f] hover:enabled:bg-[#5f7282] active:enabled:bg-[#92a5b5]"
                      inputBaseProps={{
                        errorMessage: fieldState.error?.message,
                        renderLabel: () => {
                          return (
                            <div className="mb-1.5 flex items-center justify-between">
                              <InputBase.Label label="Amount" />
                              <Chip className="bg-[#2C3F4F]">
                                Balance $
                                {(user.safeWalletDetails?.balance ?? 0).toFixed(
                                  2,
                                )}
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
            <div className="mt-4">{scenarioToActionButton[scenario]}</div>
            <div className="mt-4 flex items-center justify-between text-base font-normal">
              <span className="text-[#858D92]">Potential return</span>
              <span className="font-semibold text-[#4ADE80]">
                ${potentialReturn} ({potentialReturnPercentage}%)
              </span>
            </div>

            <UserError user={user} onRetry={retry} />
            <OrderPlacerError
              orderPlacer={orderPlacer}
              onRetry={retry}
              onSwitchWallet={user.signIn}
            />
          </div>
        </form>
      </WidgetBase>
    </div>
  );
};
