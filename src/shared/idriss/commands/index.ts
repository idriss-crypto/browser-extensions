import { GetHandleToTwitterIdCommand } from './get-handle-to-twitter-id';
import { GetDigestToWalletAddressCommand } from './get-digest-to-wallet-address';
import { GetIdToTwitterHandleCommand } from './get-id-to-twitter-handle';
import { GetReverseIdrissCommand } from './get-reverse-idriss';

export const COMMAND_MAP = {
  [GetHandleToTwitterIdCommand.name]: GetHandleToTwitterIdCommand,
  [GetDigestToWalletAddressCommand.name]: GetDigestToWalletAddressCommand,
  [GetIdToTwitterHandleCommand.name]: GetHandleToTwitterIdCommand,
  [GetReverseIdrissCommand.name]: GetReverseIdrissCommand,
};

export { GetHandleToTwitterIdCommand } from './get-handle-to-twitter-id';
export { GetDigestToWalletAddressCommand } from './get-digest-to-wallet-address';
export { GetIdToTwitterHandleCommand } from './get-id-to-twitter-handle';
export { GetReverseIdrissCommand } from './get-reverse-idriss';
