import { z } from 'zod';

export const getApiKeyResponseSchema = z.object({
  apiKey: z.string(),
  secret: z.string(),
  passphrase: z.string(),
});

export const polymarketPagePropertiesSchema = z.object({
  props: z.object({
    pageProps: z.object({
      dehydratedState: z.object({
        queries: z.array(
          z.object({
            queryKey: z.array(z.string()),
            state: z.any(),
          }),
        ),
      }),
    }),
  }),
});

export const marketsQueryStateSchema = z.object({
  data: z.object({
    markets: z.array(
      z.object({
        // TODO: z.hex?
        conditionId: z.string(),
        slug: z.string(),
      }),
    ),
  }),
});
