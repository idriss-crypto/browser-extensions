import { classes } from 'shared/ui/utils';
import { Button, Chip, WidgetBase } from 'shared/ui/components';

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
        'rounded-md bg-white text-xs leading-tight',
        className,
      )}
      top={top}
      onClose={onClose}
    >
      <header className="flex items-center justify-between space-x-3">
        <p className="text-xs font-semibold text-gray-700">
          Standard Proposal by The Optimism Foundation
        </p>
        <Chip className="rounded-sm bg-green-200 px-1 py-0.5 font-semibold text-green-600">
          Active
        </Chip>
      </header>
      <main className="mt-2">
        <p className="text-lg font-black text-black">
          {data.proposalData.title}
        </p>
        <p className="mt-1 overflow-hidden text-[#374151]">
          {data.description.slice(0, 120)}
          {data.description.length > 120 ? '...' : ''}
        </p>
      </main>
      <footer className="mt-2 flex items-center justify-between ">
        <div className="flex justify-start gap-3.5">
          <div className="flex items-center text-xs font-semibold text-gray-700">
            {getEndsInLabel(getDaysUntil(proposalEndDateInMs))}
          </div>
          <a
            href={getProposalUrl(data.proposalId)}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Chip
              className="mr-2 inline-flex h-7 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              variant="info"
              width="long"
            >
              Vote
            </Chip>
          </a>
        </div>
        <div className="flex justify-end gap-3.5">
          <Button className="inline-flex h-7 items-center justify-center rounded-md text-sm font-light text-[#444444] transition-all hover:text-[#7d848a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Previous
          </Button>
          <Button className="inline-flex h-7 items-center justify-center rounded-md text-sm font-light text-[#444444] transition-all hover:text-[#7d848a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Next
          </Button>
        </div>
      </footer>
    </WidgetBase>
  );
};
