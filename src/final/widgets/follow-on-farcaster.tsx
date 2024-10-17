import { useCallback, useEffect, useMemo, useState } from 'react';

import { FarcasterButton, GetFollowersCommand } from 'shared/farcaster';
import { useCommandQuery } from 'shared/messaging';
import { PortalWithTailwind } from 'shared/ui';
import { getWarpcastUserLink } from 'host/warpcast';

import { useLocationInfo } from '../hooks';

export const FollowOnFarcaster = () => {
  const { isTwitter, isUserPage, username } = useLocationInfo();
  const [portal, setPortal] = useState<HTMLDivElement>();

  const enabled = isTwitter && isUserPage && Boolean(username);

  const followersQuery = useCommandQuery({
    command: new GetFollowersCommand({}),
    enabled: enabled,
    placeholderData: (previousData) => {
      return previousData;
    },
  });

  const maybeUserData = useMemo(() => {
    if (!username) {
      return;
    }

    const foundEntry = Object.entries(followersQuery.data ?? {}).find(
      ([, userData]) => {
        return userData.twitter.toLowerCase() === username.toLowerCase();
      },
    );

    if (!foundEntry) {
      return;
    }

    const [farcasterName, userData] = foundEntry;
    return { ...userData, farcasterName };
  }, [followersQuery.data, username]);

  useEffect(() => {
    if (!maybeUserData) {
      return;
    }

    const userActionsButton = document.querySelector(
      '[data-testid="userActions"]',
    );

    const buttonsContainer = userActionsButton?.parentElement;
    const followButton = buttonsContainer?.lastElementChild;
    if (!followButton) {
      return;
    }
    const newPortal = document.createElement('div');
    setPortal(newPortal);

    buttonsContainer?.insertBefore(newPortal, followButton);

    return () => {
      newPortal.remove();
      setPortal(undefined);
    };
  }, [maybeUserData]);

  const goToUserPage = useCallback(() => {
    if (!maybeUserData) {
      return;
    }
    const url = getWarpcastUserLink(maybeUserData.farcasterName);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [maybeUserData]);

  if (!portal) {
    return null;
  }

  // some weird styles in the button are there to replicate buttons from Twitter which have weird styling method themself (like margin-bottom for centering)
  return (
    <PortalWithTailwind container={portal}>
      <FarcasterButton
        className="mb-3 mr-2 flex cursor-pointer rounded-full px-4 py-2 text-[15px] font-bold leading-none"
        onClick={goToUserPage}
      >
        Follow on FC
      </FarcasterButton>
    </PortalWithTailwind>
  );
};
