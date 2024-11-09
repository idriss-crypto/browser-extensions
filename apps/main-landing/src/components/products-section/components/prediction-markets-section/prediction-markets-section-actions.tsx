import { Button } from '@idriss-xyz/ui/button';
import { classes } from '@idriss-xyz/ui/utils';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';

type WaitlistInput = {
  email: string;
};

export const PredictionMarketsSectionActions = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistInput>({
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: WaitlistInput) => {
      const response = await fetch('https://api.idriss.xyz/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      return response.json();
    },
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: WaitlistInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 transition-transform duration-1000 md:flex-row lg:flex-row lg:gap-2"
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address.',
            },
          }}
          render={({ field }) => (
            <input
              type="email"
              className={classes(
                'flex h-12 w-full flex-[1_0_0] items-center rounded-[12px] border px-3 py-2 shadow-[0_0_0_4px_rgba(242,242,242,0.14)] lg:w-[290px]',

                mutation.isError && 'border-red-500',
                mutation.isSuccess && 'border-mint-500',
              )}
              placeholder="Your email"
              id="email"
              disabled={mutation.isPending}
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          intent="secondary"
          size="medium"
          className="w-full text-button2 md:w-fit lg:w-fit lg:text-button1"
          disabled={mutation.isPending}
        >
          GET EARLY ACCESS
        </Button>
      </form>
      <div className='flex flex-col gap-1 pl-1'>
        {mutation.isSuccess && (
          <span className="text-sm text-mint-500">
            You're on the list. Stay tuned for updates.
          </span>
        )}

        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}

        {mutation.isError && (
          <span className="text-sm text-red-500">
            Failed to join waitlist. Please try again later.
          </span>
        )}
      </div>
    </div>
  );
};
