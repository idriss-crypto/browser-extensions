import { MonitoringEvent } from 'shared/monitoring';

export interface Data {
  conditionId: string;
  amount: number;
  tokenId: string;
  funderAddress: string;
}

export class OrderSucceededEvent implements MonitoringEvent {
  name = 'order-succeeded';

  constructor(public meta: Data) {}
}
