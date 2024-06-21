import {
  COMMAND_BUS_REQUEST_MESSAGE,
  COMMAND_BUS_RESPONSE_MESSAGE,
  CommandResponse,
  POPUP_TO_WEBPAGE_MESSAGE,
  SerializedCommand,
  onWindowMessage,
} from 'shared/messaging';
import {
  ExtensionSettings,
  GET_EXTENSION_SETTINGS_REQUEST,
  GET_EXTENSION_SETTINGS_RESPONSE,
} from 'shared/extension';
import { ExtensionStatusManager } from 'src/popup/extension-status-manager';

import { ExperimentalFeaturesManager } from '../../popup/experimental-features-manager';

export class ContentScript {
  private constructor(private environment: typeof chrome) {}

  static run(environment: typeof chrome) {
    const contentScript = new ContentScript(environment);
    contentScript.injectScriptToWebpage();
    contentScript.bridgeCommunication();

    contentScript.subscribeToExtensionSettings();
  }

  injectScriptToWebpage() {
    const script = document.createElement('script');

    script.src = this.environment.runtime.getURL('webpage-script.js');
    document.body.append(script);
  }

  bridgeCommunication() {
    this.bridgeFromWebpageScriptToServiceWorker();
    this.bridgeFromExtensionToWebpageScript();
  }

  bridgeFromWebpageScriptToServiceWorker() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onWindowMessage<SerializedCommand<any>>(
      COMMAND_BUS_REQUEST_MESSAGE,
      (command) => {
        chrome.runtime.sendMessage(
          {
            type: COMMAND_BUS_REQUEST_MESSAGE,
            data: command,
          },
          (response) => {
            const messageDetail: CommandResponse<unknown> = {
              response,
              commandId: command.id,
            };

            const message = {
              type: COMMAND_BUS_RESPONSE_MESSAGE,
              detail: messageDetail,
            };

            window.postMessage(message);
          },
        );
      },
    );
  }

  bridgeFromExtensionToWebpageScript() {
    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === POPUP_TO_WEBPAGE_MESSAGE) {
        const message = {
          type: request.detail.postMessageType,
          detail: request.detail.data,
        };
        window.postMessage(message);
      }
    });
  }

  subscribeToExtensionSettings() {
    onWindowMessage(GET_EXTENSION_SETTINGS_REQUEST, async () => {
      const detail: ExtensionSettings = {
        experimentalFeatures: await ExperimentalFeaturesManager.isEnabled(),
        enabled: await ExtensionStatusManager.isEnabled(),
      };
      const message = {
        type: GET_EXTENSION_SETTINGS_RESPONSE,
        detail,
      };
      window.postMessage(message);
    });
  }
}
