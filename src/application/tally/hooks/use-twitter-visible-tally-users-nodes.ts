import { useMemo } from 'react';

import { useTwitterUsersPooling } from 'host/twitter';

import { getTallyUsernameNodes } from '../utils';

interface Properties {
  hidden: string[];
}

export const useTwitterVisibleTallyUsersNodes = ({ hidden }: Properties) => {
  const { results } = useTwitterUsersPooling();

  const tallyUserNodes = useMemo(() => {
    return getTallyUsernameNodes(results);
  }, [results]);

  const visibleTallys = useMemo(() => {
    return [
      ...new Set(
        tallyUserNodes.map((user) => {
          return user.tallyName;
        }),
      ),
    ]
      .filter((tallyName) => {
        return !hidden.includes(tallyName);
      })
      .map((tallyName) => {
        return {
          name: tallyName,
          top:
            tallyUserNodes.find((node) => {
              return node.tallyName === tallyName;
            })?.top ?? 0,
        };
      });
  }, [hidden, tallyUserNodes]);

  const visibleTallysNames = useMemo(() => {
    return visibleTallys.map((tally) => {
      return tally.name;
    });
  }, [visibleTallys]);

  return { visibleTallys, visibleTallysNames };
};
