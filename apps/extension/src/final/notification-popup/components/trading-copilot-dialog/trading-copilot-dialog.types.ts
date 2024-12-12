import { SwapData } from 'application/trading-copilot';
import { Wallet } from 'shared/web3';

export type TradingCopilotDialogFormValues = {
  amount: string;
};

export type TradingCopilotDialogProperties = {
  dialog: SwapData;
  closeDialog: () => void;
};

export interface TradingCopilotDialogContentProperties
  extends TradingCopilotDialogProperties {
  userName: string;
}

export type TradingCopilotWalletBalanceProperties = {
  wallet: Wallet;
};
