import { Subscription } from 'shared/trading-copilot';

import { SubscriptionItem } from './subscription-item';

type Properties = {
  subscriptions: Subscription[];
  className?: string;
  onRemove: (subscription: Subscription) => void;
};

export const SubscriptionsList = ({
  subscriptions,
  onRemove,
  className,
}: Properties) => {
  if (subscriptions.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <p className="text-sm font-semibold leading-6 text-gray-900">
        Your Subscriptions
      </p>
      <ul className="mt-2 space-y-2">
        {subscriptions.map((subscription) => {
          return (
            <SubscriptionItem
              subscription={subscription}
              key={subscription.ensName}
              onRemove={onRemove}
            />
          );
        })}
      </ul>
    </div>
  );
};
