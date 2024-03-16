import { z } from 'zod';

export const marketFormSchema = (max?: number) => {
  const baseSchema = {
    selectedTokenId: z.string(),
  };

  const amountSchema =
    max === undefined
      ? z.number().positive('Amount must be greater than 0')
      : z
          .number()
          .positive('Amount must be greater than 0')
          .lte(max, "You don't have enough balance");

  return z.object({
    ...baseSchema,
    amount: amountSchema,
  });
};
