import { useCommandMutation, useCommandQuery } from 'shared/messaging';

import {
  AddTradingCopilotSubscriptionCommand,
  GetTradingCopilotSubscriptionsCommand,
  RemoveTradingCopilotSubscriptionCommand,
} from '../commands';
import { Subscription } from '../types';

import { SubscriptionForm, SubscriptionsList } from './components';

export const SubscriptionsManagement = () => {
  const subscriberId = 'id1';

  const subscriptionsQuery = useCommandQuery({
    command: new GetTradingCopilotSubscriptionsCommand({ subscriberId }),
  });

  const subscribe = useCommandMutation(AddTradingCopilotSubscriptionCommand);
  const unsubscribe = useCommandMutation(
    RemoveTradingCopilotSubscriptionCommand,
  );

  const handleAddNewSubscription = async (subscription: Subscription) => {
    await subscribe.mutateAsync({ subscription, subscriberId });
    void subscriptionsQuery.refetch();
  };

  const handleUnsubscribe = async (subscription: Subscription) => {
    await unsubscribe.mutateAsync({ subscription, subscriberId });
    void subscriptionsQuery.refetch();
  };

  return (
    <>
      <SubscriptionForm onSubmit={handleAddNewSubscription} />
      <SubscriptionsList
        className="mt-6"
        subscriptions={[]}
        // TODO: Connect after correcting the response from the API
        // subscriptions={subscriptionsQuery.data || []}
        subscriptionsLoading={subscriptionsQuery.isLoading}
        subscriptionsUpdatePending={
          subscribe.isPending ||
          unsubscribe.isPending ||
          subscriptionsQuery.isRefetching
        }
        onRemove={handleUnsubscribe}
      />
    </>
  );
};
