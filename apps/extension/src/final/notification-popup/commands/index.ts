import { GetQuoteCommand } from './get-quote';
import { GetEnsBalanceCommand } from './get-ens-balance';

export const COMMAND_MAP = {
  [GetQuoteCommand.name]: GetQuoteCommand,
  [GetEnsBalanceCommand.name]: GetEnsBalanceCommand,
};
