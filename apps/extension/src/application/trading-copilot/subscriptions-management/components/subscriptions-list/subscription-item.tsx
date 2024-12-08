import { useCallback } from 'react';
import { ExternalLink } from '@idriss-xyz/ui/external-link';

import { useCommandQuery } from 'shared/messaging';
import { Icon, IconButton, LazyImage, getGithubUserLink } from 'shared/ui';
import { getTwitterUserLink } from 'host/twitter';
import { GetEnsNameCommand } from 'application/trading-copilot/commands/get-ens-name';

import { GetEnsInfoCommand } from '../../../commands';
import { SubscriptionRequest, SubscriptionResponse } from '../../../types';

type Properties = {
  subscription: SubscriptionResponse;
  onRemove: (address: SubscriptionRequest['address']) => void;
};

export const SubscriptionItem = ({ subscription, onRemove }: Properties) => {
  const ensNameQuery = useCommandQuery({
    command: new GetEnsNameCommand({
      address: subscription,
    }),
  });

  return (
    <SubscriptionItemContent
      onRemove={onRemove}
      subscription={subscription}
      isFallback={ensNameQuery.isFetched && ensNameQuery.data === null}
      ensName={ensNameQuery.data ?? subscription}
    />
  );
};

type SubscriptionItemContentProperties = Properties & {
  ensName: string;
  isFallback: boolean;
};

const SubscriptionItemContent = ({
  ensName,
  subscription,
  onRemove,
  isFallback,
}: SubscriptionItemContentProperties) => {
  const remove = useCallback(() => {
    onRemove(subscription);
  }, [onRemove, subscription]);

  const emailQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: ensName,
      infoKey: 'email',
    }),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !isFallback,
  });

  const twitterQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: ensName,
      infoKey: 'com.twitter',
    }),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !isFallback,
  });

  const githubQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: ensName,
      infoKey: 'com.github',
    }),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !isFallback,
  });

  const discordQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: ensName,
      infoKey: 'com.discord',
    }),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !isFallback,
  });

  const avatarQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: ensName,
      infoKey: 'avatar',
    }),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !isFallback,
  });

  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center">
        <LazyImage
          src={avatarQuery.data}
          className="size-5 rounded-full"
          fallbackComponent={
            <Icon size={20} name="PersonIcon" className="rounded-full" />
          }
        />

        <p className="ml-1.5 flex items-center gap-1.5 text-label5 text-neutral-600">
          {ensName}

          {twitterQuery.data && (
            <ExternalLink href={getTwitterUserLink(twitterQuery.data)}>
              <Icon
                size={16}
                name="TwitterLogoIcon"
                className="[&>path]:fill-rule-non-zero"
              />
            </ExternalLink>
          )}
          {githubQuery.data && (
            <ExternalLink href={getGithubUserLink(githubQuery.data)}>
              <Icon size={16} name="GitHubLogoIcon" />
            </ExternalLink>
          )}
          {discordQuery.data && (
            <span title={discordQuery.data}>
              <Icon size={16} name="DiscordLogoIcon" />
            </span>
          )}
          {emailQuery.data && (
            <ExternalLink href={`mailto:${emailQuery.data}`}>
              <Icon size={16} name="EnvelopeClosedIcon" />
            </ExternalLink>
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
