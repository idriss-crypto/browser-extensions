import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';

import { TradingCopilotSettingsManager } from '../tranding-copilot-settings-manager';
import { Subscription } from '../types';

type Payload = Record<string, never>;
type Response = Subscription[];

export class GetTradingCopilotSubscriptions extends Command<Payload, Response> {
  public readonly name = 'GetTradingCopilotSubscriptions' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const subscriptions =
        await TradingCopilotSettingsManager.getAllSubscriptions();

      return new OkResult(subscriptions);
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
