import { Command } from 'shared/messaging';

import { GetPolymarketSafeCommandDetails } from './get-polymarket-safe.types';

export class GetPolymarketSafeCommand extends Command<GetPolymarketSafeCommandDetails> {
  public name = 'GetPolymarketSafeCommand' as const;
  public id: string;

  constructor(public details: GetPolymarketSafeCommandDetails) {
    super();
    this.id = this.name;
  }
}
