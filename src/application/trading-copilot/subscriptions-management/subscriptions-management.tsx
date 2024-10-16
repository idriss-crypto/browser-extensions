import { useCommandMutation, useCommandQuery } from 'shared/messaging';
import { useNotification } from 'shared/ui';

import {
  AddTradingCopilotSubscriptionCommand,
  GetTradingCopilotSubscriptionsCommand,
  RemoveTradingCopilotSubscriptionCommand,
} from '../commands';
import { Subscription } from '../types';

import { SubscriptionForm, SubscriptionsList } from './components';

export const SubscriptionsManagement = () => {
  const notification = useNotification()

  const subscriptionsQuery = useCommandQuery({
    command: new GetTradingCopilotSubscriptionsCommand({}),
  });

  const subscribe = useCommandMutation(AddTradingCopilotSubscriptionCommand);
  const unsubscribe = useCommandMutation(
    RemoveTradingCopilotSubscriptionCommand,
  );

  const handleAddNewSubscription = async (subscription: Subscription) => {
    await subscribe.mutateAsync({ subscription });
    void subscriptionsQuery.refetch();
    notification.success(`Congrats! We will keep you updated on that user's actions`)
  };

  const handleUnsubscribe = async (ensName: Subscription['ensName']) => {
    await unsubscribe.mutateAsync({ ensName });
    void subscriptionsQuery.refetch();
  };

  return (
    <>
      <SubscriptionForm onSubmit={handleAddNewSubscription} />
      <SubscriptionsList
        className="mt-4"
        subscriptions={subscriptionsQuery.data ?? []}
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
