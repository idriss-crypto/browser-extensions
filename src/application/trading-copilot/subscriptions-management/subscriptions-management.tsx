import { SubscriptionForm, SubscriptionsList } from './components';
import { SubscriptionsManager } from './subscriptions-manager';
import { Subscription } from './types';
import { useSubscriptions } from './utils';

export const SubscriptionsManagement = () => {
  const { data: subscriptions, refetch: refetchSubscriptions } =
    useSubscriptions();

  const handleAddNewSubscription = async (subscription: Subscription) => {
    console.log('adding ➕➕', subscription);
    await SubscriptionsManager.addNewSubscription(subscription);
    void refetchSubscriptions();
  };

  const handleUnsubscribe = async (subscription: Subscription) => {
    await SubscriptionsManager.unsubscribe(subscription);
    void refetchSubscriptions();
  };

  return (
    <>
      <SubscriptionForm onSubmit={handleAddNewSubscription} />
      <SubscriptionsList
        className="mt-4"
        subscriptions={subscriptions ?? []}
        onRemove={handleUnsubscribe}
      />
    </>
  );
};
