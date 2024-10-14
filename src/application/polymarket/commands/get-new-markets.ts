import {
  Command,
  FailureResult,
  HandlerError,
  HandlerResponseError,
  OkResult,
} from 'shared/messaging';
import { ExtensionSettingsManager, NewMarketMinified } from 'shared/extension';

import { NewMarketResponse } from '../types';

type Payload = {
  limit: number;
};

export class GetNewMarketCommand extends Command<Payload, NewMarketMinified> {
  public readonly name = 'GetNewMarketCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const lastDisplayed = await ExtensionSettingsManager.getLastDisplayed();
      const now = Date.now();
      const cooldown = 3 * 60 * 1000;

      if (now - lastDisplayed < cooldown) {
        return new FailureResult('Not time to request new markets.');
      }

      let latestMarkets: NewMarketMinified[] = [];

      try {
        const response = await fetch(
          `https://gamma-api.polymarket.com/events?limit=${this.payload.limit}&active=true&archived=false&closed=false&order=startDate&ascending=false&offset=0`,
        );

        if (response.ok) {
          const json = (await response.json()) as NewMarketResponse[];

          const fetchedMarkets = json
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
            const saveMarkets =
              await ExtensionSettingsManager.saveLatestMarkets(fetchedMarkets);

            latestMarkets = saveMarkets.latestMarkets;
          } else {
            latestMarkets = await ExtensionSettingsManager.getLatestMarkets();
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
      const marketToDisplay =
        await ExtensionSettingsManager.getNextMarketToDisplay(latestMarkets);
      return marketToDisplay
        ? new OkResult(marketToDisplay)
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
