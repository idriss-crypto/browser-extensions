import {
  Command,
  FailureResult,
  HandlerError,
  HandlerResponseError,
  OkResult,
} from 'shared/messaging';
import { ExtensionSettingsManager } from 'shared/extension';

import { AdjustedMarket, NewMarketResponse } from '../types';

type Payload = {
  limit: number;
};

export class GetNewMarketCommand extends Command<Payload, AdjustedMarket> {
  public readonly name = 'GetNewMarketCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const lastDisplayed = await ExtensionSettingsManager.getLastDisplayed();
      const now = Date.now();
      const fiveMinutes = 1 * 60 * 1000;

      if (now - lastDisplayed < fiveMinutes) {
        return new FailureResult('Not time to request new markets.');
      }

      let fetchedMarkets: AdjustedMarket[] = [];
      let latestMarkets: AdjustedMarket[] = [];
      const displayedMarketIds: string[] = [];

      try {
        const response = await fetch(
          `https://gamma-api.polymarket.com/events?limit=${this.payload.limit}&active=true&archived=false&closed=false&order=startDate&ascending=false&offset=0`,
        );

        if (response.ok) {
          const json = (await response.json()) as NewMarketResponse[];

          fetchedMarkets = json
            .flatMap((item) => {
              return item.markets;
            })
            .map(({ conditionId, startDate, endDate }) => {
              return {
                conditionId,
                startDate: Math.floor(new Date(startDate).getTime() / 1000),
                endDate: Math.floor(new Date(endDate).getTime() / 1000),
              };
            });

          if (fetchedMarkets.length > 0) {
            const saveResult =
              await ExtensionSettingsManager.saveLatestMarkets(fetchedMarkets);
            latestMarkets = saveResult.latestMarkets;
          }
        } else {
          const responseText = await response.text();
          throw new HandlerResponseError(
            this.name,
            responseText,
            response.status,
          );
        }
      } catch (error) {
        this.captureException(error);
      }
      const latestMarket =
        await ExtensionSettingsManager.getNextMarketToDisplay(latestMarkets);
      return latestMarket
        ? new OkResult(latestMarket as AdjustedMarket)
        : new FailureResult('No new market to display');
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }
      return new FailureResult();
    }
  }
}
