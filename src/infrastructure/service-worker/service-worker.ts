import { TWITTER_COMMAND_MAP } from 'host/twitter';
import {
  COMMAND_BUS_REQUEST_MESSAGE,
  SerializedCommand,
} from 'shared/messaging';
import { WEB3_COMMAND_MAP } from 'shared/web3';
import { GITCOIN_COMMAND_MAP } from 'application/gitcoin';
import { POLYMARKET_COMMAND_MAP } from 'application/polymarket';
import { SNAPSHOT_COMMAND_MAP } from 'application/snapshot';
import { EXTENSION_COMMAND_MAP } from 'shared/extension';
import { MONITORING_COMMAND_MAP } from 'shared/observability';
import { UTILS_COMMAND_MAP } from 'shared/utils';
import { AGORA_COMMAND_MAP } from 'application/agora';
import { IDRISS_COMMAND_MAP } from 'shared/idriss';
import { IDRISS_SEND_COMMAND_MAP } from 'application/idriss-send';

import { GtcResolver } from '../../common/resolvers/GtcResolver';
import { SbtResolver } from '../../common/resolvers/SbtResolver';
import { AddressResolver } from '../../common/resolvers/AddressResolver';

const COMMAND_MAP = {
  ...WEB3_COMMAND_MAP,
  ...MONITORING_COMMAND_MAP,
  ...GITCOIN_COMMAND_MAP,
  ...POLYMARKET_COMMAND_MAP,
  ...EXTENSION_COMMAND_MAP,
  ...SNAPSHOT_COMMAND_MAP,
  ...UTILS_COMMAND_MAP,
  ...TWITTER_COMMAND_MAP,
  ...AGORA_COMMAND_MAP,
  ...IDRISS_COMMAND_MAP,
  ...IDRISS_SEND_COMMAND_MAP,
};

export class ServiceWorker {
  private constructor(private environment: typeof chrome) {}

  static run(environment: typeof chrome, onInstalled: () => void) {
    const serviceWorker = new ServiceWorker(environment);
    serviceWorker.subscribeToCommands();

    // TODO: double check after refactoring rest of extension
    serviceWorker.onInstalled(onInstalled);
    // TODO: remove check after refactoring rest of extension
    serviceWorker.onRestMessages();
  }

  subscribeToCommands() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.onMessage<SerializedCommand<any>>(
      COMMAND_BUS_REQUEST_MESSAGE,
      (serializedCommand, sendResponse) => {
        const commandDefinition = COMMAND_MAP[serializedCommand.name];
        if (!commandDefinition) {
          throw new Error(
            `Missing command definition for ${serializedCommand.name}. Make sure it's added to COMMAND_MAP`,
          );
        }
        const command = new commandDefinition(
          serializedCommand.payload,
          serializedCommand.id,
        );
        command
          .handle()
          .then((response: unknown) => {
            return sendResponse(response);
          })
          .catch(console.error);
      },
    );
  }

  onMessage<Data>(
    type: string,
    callback: (data: Data, sendResponse: (response: unknown) => void) => void,
  ) {
    this.environment.runtime.onMessage.addListener(
      (request, _sender, sendResponse) => {
        if (request.type === type) {
          callback(request.data, sendResponse);
        }

        return true;
      },
    );
  }

  // TODO: refactor
  onRestMessages() {
    this.environment.runtime.onMessage.addListener(
      (request, _sender, sendResponse) => {
        switch (request.type) {
          case 'apiAddressesRequest': {
            AddressResolver.get(request.value)
              .then((x) => {
                return sendResponse(x);
              })
              .catch(() => {
                return sendResponse({});
              });
            return true;
          }
          case 'reverseResolveRequest': {
            AddressResolver.getManyReverse(request.value)
              .then((x) => {
                return sendResponse(x);
              })
              .catch(() => {
                return sendResponse({});
              });
            return true;
          }
          case 'sbtRequest': {
            SbtResolver.getSBT(request.value)
              .then((x) => {
                return sendResponse(x);
              })
              .catch(() => {
                return sendResponse({});
              });
            return true;
          }
          case 'gtcRequest': {
            GtcResolver.getRoundInfo()
              .then((x) => {
                return sendResponse(x);
              })
              .catch(() => {
                return sendResponse([]);
              });
            return true;
          }
          case 'getIconUrl': {
            if (request.custom == '') {
              fetch(this.environment.runtime.getURL('img/icon148.png'))
                .then((fetchRequest) => {
                  return fetchRequest.blob();
                })
                .then((blob) => {
                  return this.readBlob(blob);
                })
                .then((x) => {
                  return sendResponse(x);
                })
                .catch(console.error);
              return true;
            } else {
              fetch(this.environment.runtime.getURL(request.custom))
                .then((fetchRequest) => {
                  return fetchRequest.blob();
                })
                .then((blob) => {
                  return this.readBlob(blob);
                })
                .then((x) => {
                  return sendResponse(x);
                })
                .catch(console.error);
              return true;
            }
          }
          case 'getTwitterIconUrl': {
            fetch(this.environment.runtime.getURL('img/twitter.svg'))
              .then((fetchRequest) => {
                return fetchRequest.blob();
              })
              .then((blob) => {
                return this.readBlob(blob);
              })
              .then((x) => {
                return sendResponse(x);
              })
              .catch(console.error);
            return true;
          }
          // No default
        }

        return true;
      },
    );
  }

  readBlob(b: Blob) {
    return new Promise(function (resolve) {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(b);
    });
  }

  onInstalled(onInstalled: () => void) {
    this.environment.runtime.onInstalled.addListener(onInstalled);
  }
}
