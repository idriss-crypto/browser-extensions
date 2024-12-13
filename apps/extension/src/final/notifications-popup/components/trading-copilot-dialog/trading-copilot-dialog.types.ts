import { SwapData } from 'application/trading-copilot';
import { Wallet } from 'shared/web3';

export interface TradingCopilotDialogFormValues {
  amount: string;
}

export interface Properties {
  dialog: SwapData;
  closeDialog: () => void;
}

export interface TradingCopilotDialogContentProperties extends Properties {
  userName: string;
}

export interface WalletBalanceProperties {
  wallet: Wallet;
}

export interface QuotePayload {
  amount: string;
  originChain: number;
  originToken: string;
  fromAddress: string;
  destinationToken: string;
  destinationChain: number;
}
