import { useCallback, useState } from 'react';

import { useTwitterProposalsToDisplay } from '../../hooks';
import { Proposal } from '../proposal';

export const Container = () => {
  const [hiddenSnapshots, setHiddenSnapshots] = useState<string[]>([]);

  const { proposalsToDisplay } = useTwitterProposalsToDisplay({
    hidden: hiddenSnapshots,
  });

  const hideSnapshot = useCallback((snapshotName: string) => {
    setHiddenSnapshots((previous) => {
      return [...previous, snapshotName];
    });
  }, []);

  return proposalsToDisplay.map(({ data, top }) => {
    return (
      <Proposal
        key={data.id}
        data={data}
        className="absolute"
        top={top - 12}
        onHide={() => {
          hideSnapshot(data.space.id);
        }}
      />
    );
  });
};
