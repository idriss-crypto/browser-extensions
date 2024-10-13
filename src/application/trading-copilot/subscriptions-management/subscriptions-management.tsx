import {
  AddTradingCopilotSubscription,
  GetTradingCopilotSubscriptions,
  RemoveTradingCopilotSubscription,
  Subscription,
} from 'shared/trading-copilot';
import { useCommandMutation, useCommandQuery } from 'shared/messaging';

import { SubscriptionForm, SubscriptionsList } from './components';

export const SubscriptionsManagement = () => {
  const subscriptionsQuery = useCommandQuery({
    command: new GetTradingCopilotSubscriptions({}),
  });

  const subscribe = useCommandMutation(AddTradingCopilotSubscription);
  const unsubscribe = useCommandMutation(RemoveTradingCopilotSubscription);

  const handleAddNewSubscription = async (subscription: Subscription) => {
    await subscribe.mutateAsync({ subscription });
    void subscriptionsQuery.refetch();
  };

  const handleUnsubscribe = async (subscription: Subscription) => {
    await unsubscribe.mutateAsync({ subscription });
    void subscriptionsQuery.refetch();
  };

  return (
    <>
      <SubscriptionForm onSubmit={handleAddNewSubscription} />
      <SubscriptionsList
        className="mt-4"
        subscriptions={subscriptionsQuery.data ?? []}
        onRemove={handleUnsubscribe}
      />
    </>
  );
};
