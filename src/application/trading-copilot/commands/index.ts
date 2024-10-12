import { GetEnsAddressCommand } from './get-address-ens-command';
import { GetEnsInfoCommand } from './get-ens-info-command';

export { GetEnsAddressCommand } from './get-address-ens-command';
export { GetEnsInfoCommand } from './get-ens-info-command';
export const COMMAND_MAP = {
    [GetEnsAddressCommand.name]: GetEnsAddressCommand,
    [GetEnsInfoCommand.name]: GetEnsInfoCommand,
} as const;