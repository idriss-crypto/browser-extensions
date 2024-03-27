import { getSnapshotFromTwitterHandle } from '../../utils';

import { Container } from './container';

interface Properties {
  handle: string;
}

export const Inject = ({ handle }: Properties) => {
  const snapshotName = getSnapshotFromTwitterHandle(handle);

  if (!snapshotName) {
    return null;
  }

  return <Container snapshotName={snapshotName} />;
};
