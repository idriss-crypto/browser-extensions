import { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useCommandMutation } from 'shared/messaging';

import { Subscription } from '../../types';
import { GetEnsAddressCommand } from '../../commands';

type SubscriptionFormValues = {
  ensName: string;
};

type Properties = {
  onSubmit: (subscription: Subscription) => void;
};

const EMPTY_FORM: SubscriptionFormValues = {
  ensName: '',
};

export const SubscriptionForm = ({ onSubmit }: Properties) => {
  const form = useForm<SubscriptionFormValues>({
    defaultValues: EMPTY_FORM,
  });

  const getEnsAddressMutation = useCommandMutation(GetEnsAddressCommand);

  const addSubscriber: SubmitHandler<SubscriptionFormValues> = useCallback(
    async (data) => {
      const address = await getEnsAddressMutation.mutateAsync({
        ensName: data.ensName,
      });
      if (!address) {
        return;
      }
      onSubmit({
        ensName: data.ensName,
        walletAddress: address,
      });
      form.reset(EMPTY_FORM);
    },
    [form, getEnsAddressMutation, onSubmit],
  );

  return (
    <form onSubmit={form.handleSubmit(addSubscriber)}>
      <label
        htmlFor="subscriptionName"
        className="text-gray-900 block text-sm font-semibold leading-6"
      >
        Subscribe to Wallet
      </label>
      <Controller
        control={form.control}
        name="ensName"
        render={({ field }) => {
          return (
            <input
              {...field}
              type="text"
              id="subscriptionName"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 mt-1 block w-full rounded-md border bg-white px-3 py-2 text-black shadow-sm focus:outline-none sm:text-sm"
              placeholder="e.g., vitalik.eth"
            />
          );
        }}
      />
    </form>
  );
};
