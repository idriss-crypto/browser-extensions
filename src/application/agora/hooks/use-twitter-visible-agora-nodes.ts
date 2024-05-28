import { useMemo } from 'react';

import { useTwitterUsersPooling } from 'src/host/twitter';

import { getAgoraUserNodes } from '../utils';

interface Properties {
  hidden: string[];
}

export const useTwitterVisibleAgoraNodes = ({ hidden }: Properties) => {
  const { results } = useTwitterUsersPooling();

  const agoraNodes = useMemo(() => {
    return getAgoraUserNodes(results);
  }, [results]);

  const visibleAgoraNodes = useMemo(() => {
    return [
      ...new Set(
        agoraNodes.map((user) => {
          return user.agoraUsername;
        }),
      ),
    ]
      .filter((agoraUsername) => {
        return !hidden.includes(agoraUsername);
      })
      .map((agoraUsername) => {
        return {
          username: agoraUsername,
          top:
            agoraNodes.find((node) => {
              return node.agoraUsername === agoraUsername;
            })?.top ?? 0,
        };
      });
  }, [agoraNodes, hidden]);

  const visibleAgoraUsernames = useMemo(() => {
    return visibleAgoraNodes.map((agoraNode) => {
      return agoraNode.username;
    });
  }, [visibleAgoraNodes]);

  return { visibleAgoraNodes, visibleAgoraUsernames };
};
