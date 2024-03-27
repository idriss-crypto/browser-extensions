export const POLYMARKET_WEBSITE = 'https://polymarket.com' as const;
export const POLYMARKET_CLOB_API = 'https://clob.polymarket.com' as const;
export const POLYMARKET_GNOSIS_SAFE_SIGNATURE = 2;

export const OUTCOME = {
  YES: 'Yes',
  NO: 'No',
} as const;

export const EMPTY_TOKEN = {
  outcome: OUTCOME.YES,
  token_id: '',
} as const;
