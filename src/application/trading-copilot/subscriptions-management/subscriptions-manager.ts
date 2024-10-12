import { SUBSCRIPTIONS_STORAGE_KEY } from "./constants";
import { Subscription } from "./types";

export const SubscriptionsManager = {
  addNewSubscription(subscription: Subscription) {
    console.log('startof addNewSubscription');
    return chrome.storage.local.get([SUBSCRIPTIONS_STORAGE_KEY])
      .then(result => {
        const allSubscriptions = (result[SUBSCRIPTIONS_STORAGE_KEY] as Subscription[] ?? []);
        console.log('allSubscriptions', allSubscriptions);

        if (allSubscriptions.some(sub => { return sub.ensName === subscription.ensName })) {
          throw new Error('User already subscribed');
        }

        console.log('addNewSubscription');
        return chrome.storage.local.set({
          [SUBSCRIPTIONS_STORAGE_KEY]: [...allSubscriptions, subscription],
        });
      });
  },

  unsubscribe(subscription: Subscription) {
    console.log('startof unsubscribe');
    return chrome.storage.local.get([SUBSCRIPTIONS_STORAGE_KEY])
      .then(result => {
        const allSubscriptions = (result[SUBSCRIPTIONS_STORAGE_KEY] as Subscription[] ?? []);
        const subscriptionIndex = allSubscriptions.findIndex(sub => { return sub.ensName === subscription.ensName });

        if (subscriptionIndex === -1) {
          throw new Error('User was not subscribed');
        }

        console.log('unsubscribe');
        return chrome.storage.local.set({
          [SUBSCRIPTIONS_STORAGE_KEY]: [
            ...allSubscriptions.slice(0, subscriptionIndex),
            ...allSubscriptions.slice(subscriptionIndex + 1)
          ],
        });
      });
  },
};
