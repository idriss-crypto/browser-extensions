import {
    Command,
    FailureResult,
    HandlerError,
    HandlerResponseError,
    OkResult,
  } from 'shared/messaging';

import { NewMarkets } from '../types';
  
  
  type Payload = {
    limit: number;
  };
  
  export class GetNewMarketCommand extends Command<
    Payload,
    NewMarkets
  > {
    public readonly name = 'GetNewMarketCommand' as const;

    constructor(public payload: Payload) {
        super();
      }
  
    async handle() {
      try {
        const response = await fetch(`https://gamma-api.polymarket.com/events?limit=${this.payload.limit}&active=true&archived=false&closed=false&order=startDate&ascending=false&offset=0`,
        );
  
        if (!response.ok) {
          const responseText = await response.text();
          throw new HandlerResponseError(
            this.name,
            responseText,
            response.status,
          );
        }
  
        // TODO: validate response
        const json = await response.json();
        return new OkResult(json as NewMarkets);
      } catch (error) {
        this.captureException(error);
        if (error instanceof HandlerError) {
          return new FailureResult(error.message);
        }
        return new FailureResult();
      }
    }
  }
  