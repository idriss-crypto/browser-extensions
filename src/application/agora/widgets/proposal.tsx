import { classes } from 'shared/ui/utils';
import { Chip, WidgetBase } from 'shared/ui/components';

import { ProposalData } from '../types';
import { getDaysUntil, getEndsInLabel, getProposalUrl } from '../utils';

interface Properties {
  data: ProposalData;
  className?: string;
  top?: number;
  onClose?: () => void;
}

export const Proposal = ({ data, className, top, onClose }: Properties) => {
  const proposalEndDateInMs = new Date(
    data.proposalData.endTimestamp,
  ).getTime();

  return (
    <WidgetBase
      className={classes(
        'rounded-lg bg-[#2d2d2d] text-xs leading-tight',
        className,
      )}
      top={top}
      onClose={onClose}
    >
      <header className="flex items-center justify-between space-x-3">
        <p>Standard Proposal by The Optimism Foundation</p>
        <Chip>Active</Chip>
      </header>
      <main className="mt-2">
        <p className="text-base font-semibold">{data.proposalData.title}</p>
        <p className="mt-1 overflow-hidden text-[#ccc]">
          ${data.description.slice(0, 120)}...
        </p>
      </main>
      <footer className="mt-2 flex items-center space-x-2">
        <div className="text-[#aaa]">
          {getEndsInLabel(getDaysUntil(proposalEndDateInMs))}
        </div>
        <a
          href={getProposalUrl(data.proposalId)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Chip className="py-1" variant="info" width="long">
            Vote
          </Chip>
        </a>
        <div className="flex">
          <a
            href="#"
            className="flex h-8 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </a>

          <a
            href="#"
            className="ms-3 flex h-8 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </a>
        </div>
      </footer>
    </WidgetBase>
  );
};
