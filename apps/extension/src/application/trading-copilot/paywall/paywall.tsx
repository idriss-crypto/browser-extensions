import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@idriss-xyz/ui/button';

type SubscriptionFormValues = {
  months: number;
};

const EMPTY_FORM: SubscriptionFormValues = {
  months: 1,
};

export const Paywall: React.FC = () => {
  const form = useForm<SubscriptionFormValues>({
    defaultValues: EMPTY_FORM,
  });
  const pricePerMonth = 0.001;
  const companyAddress = '0x1234567890123456789012345678901234567890'; // Replace with real address on constants

  // TODO: Implement sending payment to companyAddress

  const totalPrice = (form.watch('months') * pricePerMonth).toFixed(3);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1>Get started with Copilot</h1>

      <form>
        <label
          htmlFor="months"
          className="block text-label4 text-neutralGreen-700"
        >
          Select months
        </label>
        <Controller
          control={form.control}
          name="months"
          render={({ field }) => {
            return (
              <input
                {...field}
                className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="number"
                min={1}
              />
            );
          }}
        ></Controller>
      </form>

      <div
        className="block text-label4 text-neutralGreen-700 text-center mt-4"
      >
        <p>Price per month: {pricePerMonth} ETH</p>
        <p className="font-bold">Total: {totalPrice} ETH</p>
      </div>

      <Button
        intent="primary"
        size="medium"
        className="mx-auto mt-10"
        onClick={() => {
          // Implement Web3 transfer logic here
          console.log(`Sending ${totalPrice} ETH to ${companyAddress}`);
        }}
      >
        SEND
      </Button>
    </div>
  );
};
