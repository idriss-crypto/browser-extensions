import { TickSize } from "@polymarket/clob-client";
import { Hex, Wallet } from "shared/web3";

export interface PlaceOrderArguments {
  wallet: Wallet;
  funderAddress: Hex;
  orderDetails: {
    minimumTickSize: TickSize;
    negRisk: boolean;
    tokenId: string;
    amount: number;
  };
}
