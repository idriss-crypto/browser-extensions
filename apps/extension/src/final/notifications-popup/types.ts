export type QuoteResponse = {
  success: boolean;
  estimate: Estimate;
  type: string;
  tool: string;
  includedSteps: IncludedStep[];
  transactionData: TransactionData;
  options: Options;
};

type Estimate = {
  tool: string;
  approvalAddress: string;
  toAmountMin: string;
  toAmount: string;
  fromAmount: string;
  feeCosts: FeeCost[];
  gasCosts: GasCost[];
  executionDuration: number;
  fromAmountUSD: string;
  toAmountUSD: string;
};

type FeeCost = {
  name: string;
  description: string;
  token: Token;
  amount: string;
  amountUSD: string;
  percentage: string;
  included: boolean;
};

type Token = {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI: string;
  priceUSD: string;
};

type GasCost = {
  type: string;
  price: string;
  estimate: number;
  limit: number;
  amount: string;
  amountUSD: string;
  token: Token;
};

type IncludedStep = {
  id: string;
  type: string;
  action: Action;
  estimate: Estimate;
  tool: string;
  toolDetails: ToolDetails;
};

type Action = {
  fromChainId: number;
  fromAmount: string;
  fromToken: Token;
  toChainId: number;
  toToken: Token;
  slippage: number;
  fromAddress: string;
  destinationGasConsumption: string;
  destinationCallData: string;
  toAddress: string;
};

type ToolDetails = {
  key: string;
  name: string;
  logoURI: string;
};

type TransactionData = {
  data: string;
  to: string;
  value: string;
  from: string;
  chainId: number;
  gasPrice: string;
  gasLimit: string;
};

type Options = {
  allowSwitchChain: boolean;
};
