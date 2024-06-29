import { useMemo } from 'react';

import { useTwitterScraping } from 'host/twitter';

import { getAgoraUserNodes } from '../utils';

interface Properties {
  hidden: string[];
}

export const useTwitterVisibleAgoraNodes = ({ hidden }: Properties) => {
  const { users } = useTwitterScraping();

  const agoraNodes = useMemo(() => {
    return getAgoraUserNodes(users);
  }, [users]);

  const visibleAgoraNodes = useMemo(() => {
    return agoraNodes
      .filter((node) => {
        return !hidden.includes(node.agoraUsername);
      })
      .map((node) => {
        return {
          username: node.agoraUsername,
          top: node.top,
          twitterHandle: node.value,
        };
      });
  }, [agoraNodes, hidden]);

  return { visibleAgoraNodes };
};
