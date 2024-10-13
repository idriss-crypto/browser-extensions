import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';

import { Subscription } from '../types';
import { TradingCopilotSettingsManager } from '../tranding-copilot-settings-manager';

interface Payload {
  subscription: Subscription;
}

type Response = boolean;

export class AddTradingCopilotSubscription extends Command<Payload, Response> {
  public readonly name = 'AddTradingCopilotSubscription' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      await TradingCopilotSettingsManager.addNewSubscription(
        this.payload.subscription,
      );

      return new OkResult(true);
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
