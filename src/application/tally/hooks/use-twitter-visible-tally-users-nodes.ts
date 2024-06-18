import { useMemo } from 'react';

import { useTwitterUsersPooling } from 'host/twitter';

import { getTallyUserNodes } from '../utils';

interface Properties {
  hidden: string[];
}

export const useTwitterVisibleTallyUsersNodes = ({ hidden }: Properties) => {
  const { results } = useTwitterUsersPooling();

  const tallyUserNodes = useMemo(() => {
    return getTallyUserNodes(results);
  }, [results]);

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
