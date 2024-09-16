import { GetHandleToTwitterIdCommand } from './get-handle-to-twitter-id';
import { GetDigestToWalletAddressCommand } from './get-digested-to-wallet-address-command';
import { GetIdToTwitterHandleCommand } from './get-id-to-twitter-handle';
import { GetReverseResolution } from './get-reverse-idriss-command';

export const COMMAND_MAP = {
  [GetHandleToTwitterIdCommand.name]: GetHandleToTwitterIdCommand,
  [GetDigestToWalletAddressCommand.name]: GetDigestToWalletAddressCommand,
  [GetIdToTwitterHandleCommand.name]: GetHandleToTwitterIdCommand,
  [GetReverseResolution.name]: GetDigestToWalletAddressCommand,
};

export { GetHandleToTwitterIdCommand } from './get-handle-to-twitter-id';
export { GetDigestToWalletAddressCommand } from './get-digested-to-wallet-address-command';
export { GetIdToTwitterHandleCommand } from './get-id-to-twitter-handle';
export { GetReverseResolution } from './get-reverse-idriss-command';
