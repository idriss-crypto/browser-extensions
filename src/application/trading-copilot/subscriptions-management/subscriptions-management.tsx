import { useState } from 'react';

import { useCommandMutation, useCommandQuery } from 'shared/messaging';
import { Button, LazyImage, useNotification } from 'shared/ui';

import {
  AddTradingCopilotSubscriptionCommand,
  GetTradingCopilotSubscriptionsCommand,
  RemoveTradingCopilotSubscriptionCommand,
} from '../commands';
import { Subscription } from '../types';

import { SubscriptionForm, SubscriptionsList } from './components';

const TestComponent = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <h1>Hey, you</h1>
      <h3>I have a pleasure to notify you about a new feature</h3>
      <LazyImage
        src="https://www.lego.com/cdn/cs/set/assets/blt42e887277e9ae38b/60399_alt1.png?fit=bounds&format=png&width=1500&height=1500&dpr=1"
      />
      <Button
        onClick={() => {
          setClicked(true)
          console.log('clicked 🎉🎉');
        }}
      >
        {clicked ? 'Click to see more' : 'More coming soon!'}
      </Button>
    </div>
  );
};

export const SubscriptionsManagement = () => {
  const notification = useNotification();

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
    notification.show(<TestComponent />, 'bottom-right');
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
