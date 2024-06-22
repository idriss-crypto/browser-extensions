import { useCommandQuery } from 'shared/messaging';

import { GetDaoHandlesCommand } from '../commands';

export const useDaoHandles = (application: string) => {
  return useCommandQuery({
    staleTime: Number.POSITIVE_INFINITY,
    command: new GetDaoHandlesCommand({}),
    select: (handles) => {
      return handles[application.toLowerCase()] ?? {};
    },
  });
};
