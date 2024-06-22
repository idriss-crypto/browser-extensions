import { useMemo } from 'react';

import { useDaoHandles } from 'shared/extension';
import { useTwitterScraping } from 'host/twitter';

import { getTallyUserNodes } from '../utils';

interface Properties {
  hidden: string[];
}

export const useTwitterVisibleTallyUsersNodes = ({ hidden }: Properties) => {
  const { tweetAuthors } = useTwitterScraping();
  const { data: daoHandles } = useDaoHandles('tally');

  const tallyUserNodes = useMemo(() => {
    if (!daoHandles) {
      return [];
    }
    return getTallyUserNodes(daoHandles, tweetAuthors);
  }, [daoHandles, tweetAuthors]);

  const visibleTallyNodes = useMemo(() => {
    return tallyUserNodes
      .filter((tallyNode) => {
        return !hidden.includes(tallyNode.tallyName);
      })
      .map((tallyNode) => {
        return {
          name: tallyNode.tallyName,
          top: tallyNode.top ?? 0,
        };
      });
  }, [hidden, tallyUserNodes]);

  return { visibleTallyNodes };
};
