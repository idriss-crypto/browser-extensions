import { createLookup } from 'shared/utils';

export const TALLY_WEBSITE_URL = 'https://www.tally.xyz';
export const TALLY_GRAPHQL_API_URL = 'https://api.idriss.xyz/fetch-tally';

export const FARCASTER_HANDLE_TO_TALLY: Record<string, string> = {
  'aave': '2206072049829414624',
  'arbitrum': '2206072050315953936',
  'ens': '2206072050458560426',
  'ensdomains': '2206072050458560426',
  'gitcoin': '2206072049862969321',
  'hopprotocol': '2206072050408228377',
  'internet-token': '2289260179507643466',
  'letsgethai': '2260960194542438166',
  'lilnouns': '2206072050408228378',
  'lilnounsdao': '2206072050408228378',
  'lxdao': '2349116776505149049',
  'moonwell': '2206072050299176543',
  'nouns': '2206072050307565231',
  'ondo': '2206072049871357011',
  'opendollar': '2235789849409881260',
  'optimism': '2206072049871356990',
  'pool-together': '2206072050324342616',
  'pooltogether': '2206072050324342616',
  'rndao': '2299451715641935267',
  'seamlessfi': '2212190090728309863',
  'stakediva': '2206072049946855142',
  'thedopewars': '2206072050307565230',
  'threshold': '2206072050416617005',
  'uniswap': '2206072050458560434',
  'unlock-protocol': '2206072050307565245',
  'zksync': '2297436623035434412',
};

export const EVENT = createLookup(['TALLY_VOTE_CLICKED']);
