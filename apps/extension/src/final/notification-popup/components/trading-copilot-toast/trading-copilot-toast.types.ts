import { SwapData } from 'application/trading-copilot';

export type TradingCopilotToastProperties = {
  toast: SwapData;
  openDialog: (dialogHash: string) => void;
};

export interface TradingCopilotToastContentProperties
  extends TradingCopilotToastProperties {
  userName: string;
}
