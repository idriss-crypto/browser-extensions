'use client';
import Image from 'next/image';
import { Form } from '@idriss-xyz/ui/form';
import { Button } from '@idriss-xyz/ui/button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { classes } from '@idriss-xyz/ui/utils';

import { backgroundLines2 } from '@/assets';
import { TopBar } from '@/components';

import {
  CHAIN,
  CHAIN_ID_TO_TOKENS,
  DEFAULT_ALLOWED_CHAINS_IDS,
} from './donate/constants';
import { Providers } from './providers';
import { ChainToken } from './donate/types';
import { Multiselect, MultiselectOption } from '@idriss-xyz/ui/multiselect';

type FormPayload = {
  address: string;
  tokensSymbols: string[];
  chainsIds: number[];
};

const ALL_CHAIN_IDS = Object.values(CHAIN).map((chain) => chain.id);
const ALL_TOKEN_SYMBOLS = Object.values(CHAIN_ID_TO_TOKENS)
  .flat()
  .map((token) => token.symbol);
const UNIQUE_ALL_TOKEN_SYMBOLS = Array.from(
  new Map(ALL_TOKEN_SYMBOLS.map((symbol) => [symbol, symbol])).values(),
);

// ts-unused-exports:disable-next-line
export default function Donors() {
  const [copiedDonationLink, setCopiedDonationLink] = useState(false);
  const [copiedObsLink, setCopiedObsLink] = useState(false);

  const formMethods = useForm<FormPayload>({
    defaultValues: {
      address: '',
      chainsIds: ALL_CHAIN_IDS,
      tokensSymbols: UNIQUE_ALL_TOKEN_SYMBOLS,
    },
  });
  const [chainsIds, tokensSymbols, address] = formMethods.watch([
    'chainsIds',
    'tokensSymbols',
    'address',
  ]);

  const selectedChainsTokens: ChainToken[] = useMemo(() => {
    return chainsIds
      .map((chainId) => CHAIN_ID_TO_TOKENS[chainId])
      .flat()
      .map((token) => token)
      .filter((token) => token !== undefined);
  }, [chainsIds]);

  const uniqueTokenOptions: MultiselectOption<string>[] = useMemo(() => {
    return Array.from(
      new Map(selectedChainsTokens.map((token) => [token.symbol, token]))
        .values()
        .map((token) => ({
          label: token.name,
          value: token.symbol,
          icon: (
            <img
              src={token.logo}
              className="size-6 rounded-full"
              alt={token.symbol}
            />
          ),
        })),
    ).sort((a, b) => a.value.localeCompare(b.value));
  }, [selectedChainsTokens]);

  const allowedChainOptions: MultiselectOption<number>[] = useMemo(() => {
    return DEFAULT_ALLOWED_CHAINS_IDS.map((chainId) => {
      const foundChain = Object.values(CHAIN).find((chain) => {
        return chain.id === chainId;
      });
      if (!foundChain) {
        throw new Error(`${chainId} not found`);
      }
      return {
        label: foundChain.name,
        value: foundChain.id,
        icon: (
          <img
            src={foundChain.logo}
            className="size-6 rounded-full"
            alt={foundChain.name}
          />
        ),
      };
    });
  }, []);

  const onChangeChainId = useCallback(() => {
    formMethods.setValue(
      'tokensSymbols',
      tokensSymbols.filter((symbol) => {
        return selectedChainsTokens.some((option) => {
          return option.symbol === symbol;
        });
      }),
    );
  }, [formMethods, tokensSymbols, selectedChainsTokens]);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const copyDonationLink = async () => {
    const chainsShortNames = chainsIds
      .reduce((previous, chainId) => {
        return [
          ...previous,
          Object.values(CHAIN).find((chain) => {
            return chain.id === chainId;
          })?.shortName ?? '',
        ];
      }, [] as string[])
      .filter(Boolean);

    await navigator.clipboard.writeText(
      `https://www.idriss.xyz/creators/donate?address=${address}&token=${tokensSymbols.join(',')}&network=${chainsShortNames.join(',')}`,
    );

    setCopiedDonationLink(true);
    setCopiedObsLink(false);
  };
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const copyObsLink = async () => {
    await navigator.clipboard.writeText(
      `https://api.idriss.xyz/creators/obs?address=${address}`,
    );

    setCopiedDonationLink(false);
    setCopiedObsLink(true);
  };

  const resetCopyState = useCallback(() => {
    setCopiedObsLink(false);
    setCopiedDonationLink(false);
  }, []);

  useEffect(() => {
    resetCopyState();
  }, [address, tokensSymbols, chainsIds, resetCopyState]);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit: SubmitHandler<FormPayload> = () => {
    //
  };

  return (
    <Providers>
      <TopBar />
      <main className="flex grow items-start justify-center overflow-hidden bg-[radial-gradient(111.94%_122.93%_at_16.62%_0%,_#E7F5E7_0%,_#76C282_100%)] pt-[104px]">
        <Image
          priority
          src={backgroundLines2}
          className="pointer-events-none absolute top-0 hidden h-full opacity-40 lg:block"
          alt=""
        />

        <div className="container flex w-[426px] max-w-full flex-col items-center rounded-xl bg-white px-4 pb-3 pt-6 lg:mt-[108px]">
          <h1 className="self-start text-heading4">
            Create your donation links
          </h1>
          <div className="w-full">
            <Form
              className="w-full"
              onSubmit={formMethods.handleSubmit(onSubmit)}
            >
              <Controller
                control={formMethods.control}
                name="address"
                render={({ field }) => {
                  return (
                    <Form.Field
                      label="Wallet address"
                      className="mt-6 w-full"
                      {...field}
                    />
                  );
                }}
              />

              <Controller
                control={formMethods.control}
                name="chainsIds"
                render={({ field }) => {
                  return (
                    <Multiselect<number>
                      inputClassName="mt-6 w-full"
                      label="Network"
                      options={allowedChainOptions}
                      onChange={(value) => {
                        onChangeChainId();
                        field.onChange(value);
                      }}
                      value={field.value}
                    />
                  );
                }}
              />

              <Controller
                control={formMethods.control}
                name="tokensSymbols"
                render={({ field }) => {
                  return (
                    <Multiselect<string>
                      inputClassName="mt-6 w-full"
                      label="Token"
                      options={uniqueTokenOptions}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  );
                }}
              />
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  intent="primary"
                  size="medium"
                  prefixIconName={
                    copiedDonationLink ? 'CheckCircle2' : undefined
                  }
                  className={classes(
                    'w-full',
                    copiedDonationLink &&
                      'bg-mint-600 hover:bg-mint-600 [&>div]:hidden',
                  )}
                  onClick={copyDonationLink}
                >
                  {copiedDonationLink ? 'COPIED' : 'DONATION LINK'}
                </Button>

                <Button
                  intent="secondary"
                  size="medium"
                  prefixIconName={copiedObsLink ? 'CheckCircle2' : undefined}
                  className={classes(
                    'w-full',
                    copiedObsLink &&
                      'border-mint-600 bg-mint-300 hover:bg-mint-300',
                  )}
                  onClick={copyObsLink}
                >
                  {copiedObsLink ? 'COPIED' : 'OBS LINK'}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </main>
    </Providers>
  );
}
