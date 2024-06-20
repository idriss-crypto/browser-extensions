import { useMemo } from 'react';

import { useTwitterUsersPooling } from 'host/twitter';
import { useGetDaoHandles } from 'shared/extension/commands/get-dao-handles';

import { getTallyUserNodes } from '../utils';

interface Properties {
  hidden: string[];
}

export const useTwitterVisibleTallyUsersNodes = ({ hidden }: Properties) => {
  const { results } = useTwitterUsersPooling();
  const { data: daoHandles } = useGetDaoHandles('tally');

  const tallyUserNodes = useMemo(() => {
    if (!daoHandles) {
      return [];
    }
    return getTallyUserNodes(daoHandles, results);
  }, [daoHandles, results]);

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
