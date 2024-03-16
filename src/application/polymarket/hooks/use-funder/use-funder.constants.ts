export const SAFE_USDC_ADDRES = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';

export const ERC_20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)',
  'event Transfer(address indexed from, address indexed to, uint amount)',
];
