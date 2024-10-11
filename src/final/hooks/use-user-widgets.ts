import { useMemo } from 'react';

import { useGitcoinDonationWidgetsData } from 'application/gitcoin';
import { useIdrissSendWidgetsData } from 'application/idriss-send';
import { useExtensionSettings } from 'shared/extension';
import { useCommandQuery } from 'shared/messaging';
import { GetFollowersCommand } from 'shared/farcaster';
import { EMPTY_HEX } from 'shared/web3';

import { userWidgetDataAdapter } from '../adapters';

import { useApplicationStatus } from './use-application-status';
import { useScraping } from './use-scraping';
import { useLocationInfo } from './use-location-info';

export const useUserWidgets = () => {
  const applicationsStatus = useApplicationStatus();
  const { isTwitter, isWarpcast, isSupercast } = useLocationInfo();
  const { extensionSettings } = useExtensionSettings();

  const { users } = useScraping();

  const usernames = useMemo(() => {
    return users.map((user) => {
      return user.data.username;
    });
  }, [users]);

  const idrissSendEnabled =
    applicationsStatus.idrissSend && extensionSettings['idriss-send-enabled'];

  const followersQuery = useCommandQuery({
    command: new GetFollowersCommand({ usernames }),
    enabled: idrissSendEnabled && (isSupercast || isWarpcast),
    placeholderData: (previousData) => {
      return previousData;
    },
  });

  const { widgets: idrissSendWidgets } = useIdrissSendWidgetsData({
    scrapedUsers: users,
    enabled: idrissSendEnabled && isTwitter,
  });

  const gitcoinEnabled =
    applicationsStatus.gitcoin && extensionSettings['gitcoin-enabled'];

  const { widgets: gitcoinDonationWidgets } = useGitcoinDonationWidgetsData({
    scrapedUsers: users,
    enabled: gitcoinEnabled && isTwitter,
  });

  if (isWarpcast || isSupercast) {
    const usersThatFollowIdriss = users.map((user) => {
      const userWallet = followersQuery.data?.[user.data.username];
      // if (!userWallet) {
      //   return;
      // }
      return {
        ...user,
        data: { ...user.data, walletAddress: userWallet ?? EMPTY_HEX },
      };
    });

    return {
      widgets: userWidgetDataAdapter.fromFarcasterUsers({
        users: usersThatFollowIdriss,
      }),
    };
  }

  return {
    widgets: userWidgetDataAdapter.fromTwitterWidgetsData({
      applicationsStatus: {
        gitcoin: gitcoinEnabled,
        idrissSend: idrissSendEnabled,
      },
      idrissSendWidgets,
      gitcoinDonationWidgets,
    }),
  };
};
