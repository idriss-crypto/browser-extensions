import { SUBSCRIPTIONS_STORAGE_KEY } from "./constants";
import { Subscription } from "./types";

export const TradingCopilotSettingsManager = {
  getAllSubscriptions() {
    return new Promise<Subscription[]>((resolve) => {
      void chrome.storage.local
        .get([SUBSCRIPTIONS_STORAGE_KEY])
        .then((result) => {
          resolve(result[SUBSCRIPTIONS_STORAGE_KEY] ?? []);
        });
    })
  },

  addNewSubscription(subscription: Subscription) {
    return chrome.storage.local.get([SUBSCRIPTIONS_STORAGE_KEY])
      .then(result => {
        const allSubscriptions = (result[SUBSCRIPTIONS_STORAGE_KEY] as Subscription[] ?? []);

        if (allSubscriptions.some(sub => { return sub.ensName === subscription.ensName })) {
          throw new Error('User already subscribed');
        }

        return chrome.storage.local.set({
          [SUBSCRIPTIONS_STORAGE_KEY]: [...allSubscriptions, subscription],
        });
      });
  },

  unsubscribe(subscription: Subscription) {
    return chrome.storage.local.get([SUBSCRIPTIONS_STORAGE_KEY])
      .then(result => {
        const allSubscriptions = (result[SUBSCRIPTIONS_STORAGE_KEY] as Subscription[] ?? []);
        const subscriptionIndex = allSubscriptions.findIndex(sub => { return sub.ensName === subscription.ensName });

        if (subscriptionIndex === -1) {
          throw new Error('User was not subscribed');
        }

        return chrome.storage.local.set({
          [SUBSCRIPTIONS_STORAGE_KEY]: [
            ...allSubscriptions.slice(0, subscriptionIndex),
            ...allSubscriptions.slice(subscriptionIndex + 1)
          ],
        });
      });
  },
};
