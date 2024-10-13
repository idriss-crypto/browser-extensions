import { Command, FailureResult, HandlerError, OkResult } from "shared/messaging";

import { Subscription } from "../types";
import { TradingCopilotSettingsManager } from "../tranding-copilot-settings-manager";


interface Payload {
  subscription: Subscription;
}

type Response = boolean;

export class RemoveTradingCopilotSubscription extends Command<Payload, Response> {
  public readonly name = 'RemoveTradingCopilotSubscription' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      await TradingCopilotSettingsManager.unsubscribe(this.payload.subscription);

      return new OkResult(true);
    }
    catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
