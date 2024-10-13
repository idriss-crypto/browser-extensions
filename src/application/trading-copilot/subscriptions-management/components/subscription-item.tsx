import { useCallback } from 'react';

import { useCommandQuery } from 'shared/messaging';
import { Icon, IconButton } from 'shared/ui';
import { FARCASTER_LOGO } from 'assets/images';
import { GetEnsInfoCommand, Subscription } from 'shared/trading-copilot';

type Properties = {
  subscription: Subscription;
  onRemove: (subscription: Subscription) => void;
};

export const SubscriptionItem = ({ subscription, onRemove }: Properties) => {
  const remove = useCallback(() => {
    onRemove(subscription);
  }, [onRemove, subscription]);

  const emailQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: subscription.ensName,
      infoKey: 'email',
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });

  const twitterQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: subscription.ensName,
      infoKey: 'com.twitter',
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });

  const githubQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: subscription.ensName,
      infoKey: 'com.github',
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });

  const discordQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: subscription.ensName,
      infoKey: 'com.discord',
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });

  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center">
        <Icon size={16} name="PersonIcon" className="rounded-full" />
        <p className="ml-2 flex items-center gap-1 text-sm text-gray-700">
          {subscription.ensName}

          {(subscription.twitterUsername ?? twitterQuery.data) && (
            <a
              href={`https://x.com/${subscription.twitterUsername ?? twitterQuery.data}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon
                size={16}
                name="TwitterLogoIcon"
                className="text-twitter-primary [&>path]:fill-rule-non-zero"
              />
            </a>
          )}
          {githubQuery.data && (
            <a
              href={`https://github.com/${githubQuery.data}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon
                size={16}
                name="GitHubLogoIcon"
                className="text-twitter-primary [&>path]:fill-rule-non-zero"
              />
            </a>
          )}
          {discordQuery.data && (
            <span title={discordQuery.data}>
              <Icon
                size={16}
                name="DiscordLogoIcon"
                className="text-twitter-primary [&>path]:fill-rule-non-zero"
              />
            </span>
          )}
          {emailQuery.data && (
            <a
              href={`mailto:${emailQuery.data}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon
                size={16}
                name="EnvelopeClosedIcon"
                className="text-twitter-primary [&>path]:fill-rule-non-zero"
              />
            </a>
          )}
          {subscription.farcasterUsername && (
            <a
              href={`https://warpcast.com/${subscription.farcasterUsername}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={FARCASTER_LOGO}
                alt="Farcaster logo"
                className="size-4 rounded-full mt-1"
              />
            </a>
          )}
        </p>
      </div>
      <IconButton
        iconProps={{ name: 'Cross1Icon' }}
        className="text-red-700"
        onClick={remove}
      />
    </li>
  );
};
