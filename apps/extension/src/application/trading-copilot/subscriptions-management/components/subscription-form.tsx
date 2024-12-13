import { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useCommandMutation } from 'shared/messaging';

import { GetEnsAddressCommand } from '../../commands';

import { Properties, FormValues } from './subscription-form.types';

const EMPTY_FORM: FormValues = {
  subscriptionDetails: '',
};

export const SubscriptionForm = ({ onSubmit }: Properties) => {
  const form = useForm<FormValues>({
    defaultValues: EMPTY_FORM,
  });

  const getEnsAddressMutation = useCommandMutation(GetEnsAddressCommand);

  const addSubscriber: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      const hexPattern = /^0x[\dA-Fa-f]+$/;
      const isWalletAddress = hexPattern.test(data.subscriptionDetails);

      if (isWalletAddress) {
        onSubmit(data.subscriptionDetails);
        form.reset(EMPTY_FORM);
      } else {
        const address = await getEnsAddressMutation.mutateAsync({
          ensName: data.subscriptionDetails,
        });

        if (!address) {
          return;
        }

        onSubmit(address);
        form.reset(EMPTY_FORM);
      }
    },
    [form, getEnsAddressMutation, onSubmit],
  );

  return (
    <form onSubmit={form.handleSubmit(addSubscriber)}>
      <label
        htmlFor="subscriptionDetails"
        className="block text-label4 text-neutralGreen-700"
      >
        Subscribe to Wallet
      </label>
      <Controller
        control={form.control}
        name="subscriptionDetails"
        render={({ field }) => {
          return (
            <input
              {...field}
              type="text"
              id="subscriptionDetails"
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., vitalik.eth"
            />
          );
        }}
      />
    </form>
  );
};
