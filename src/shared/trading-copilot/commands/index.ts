import { AddTradingCopilotSubscription } from './add-trading-copilot-subscription';
import { GetTradingCopilotSubscriptions } from './get-trading-copilot-subscriptions';
import { RemoveTradingCopilotSubscription } from './remove-trading-copilot-subscription';
import { GetEnsInfoCommand } from './get-ens-info-command';
import { GetEnsAddressCommand } from './get-address-ens-command';

export const COMMAND_MAP = {
  [AddTradingCopilotSubscription.name]: AddTradingCopilotSubscription,
  [GetTradingCopilotSubscriptions.name]: GetTradingCopilotSubscriptions,
  [RemoveTradingCopilotSubscription.name]: RemoveTradingCopilotSubscription,
  [GetEnsInfoCommand.name]: GetEnsInfoCommand,
  [GetEnsAddressCommand.name]: GetEnsAddressCommand,
};

export { AddTradingCopilotSubscription } from './add-trading-copilot-subscription';
export { GetTradingCopilotSubscriptions } from './get-trading-copilot-subscriptions';
export { RemoveTradingCopilotSubscription } from './remove-trading-copilot-subscription';
export { GetEnsInfoCommand } from './get-ens-info-command';
export { GetEnsAddressCommand } from './get-address-ens-command';
