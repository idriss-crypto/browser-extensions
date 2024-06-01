import { classes } from 'shared/ui/utils';
import { Button, Chip, WidgetBase } from 'shared/ui/components';

import { ProposalData } from '../types';
import { getDaysUntil, getEndsInLabel, getProposalUrl } from '../utils';

interface Properties {
  data: ProposalData;
  className?: string;
  top?: number;
  isPreviousProposalAvailable: boolean;
  isNextProposalAvailable: boolean;
  loadingNextProposal: boolean;
  onClose?: () => void;
  showPreviousProposal: () => void;
  showNextProposal: () => void;
}

export const Proposal = ({
  data,
  className,
  top,
  isPreviousProposalAvailable,
  isNextProposalAvailable,
  loadingNextProposal,
  onClose,
  showPreviousProposal,
  showNextProposal,
}: Properties) => {
  const proposalEndDateInMs = new Date(
    data.proposalData.endTimestamp,
  ).getTime();

  const navigationButtonClassName =
    'inline-flex h-7 select-none items-center justify-center rounded-md text-sm font-light text-[#444444] transition-all hover:text-[#7d848a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-white';

  return (
    <WidgetBase
      className={classes(
        'grid h-[200px] rounded-md bg-white text-xs leading-tight',
        className,
      )}
      top={top}
      onClose={onClose}
    >
      <header className="mb-auto flex items-center justify-between space-x-3">
        <p className="text-xs font-semibold text-gray-700">
          Standard Proposal by The Optimism Foundation
        </p>
        <Chip className="rounded-sm bg-green-200 px-1 py-0.5 font-semibold uppercase text-green-600">
          Active
        </Chip>
      </header>
      <main className="mt-2">
        <p className="text-lg font-black text-black">
          {data.proposalData.title.slice(0, 56)}
          {data.proposalData.title.length > 56 ? '...' : ''}
        </p>
        <p className="mt-1 overflow-hidden text-[#374151]">
          {data.description.slice(0, 120)}
          {data.description.length > 120 ? '...' : ''}
        </p>
      </main>
      <footer className="mt-auto flex items-center justify-between">
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
              className="mr-2 inline-flex h-7 select-none items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              variant="info"
              width="long"
            >
              Vote
            </Chip>
          </a>
        </div>
        <div className="flex justify-end gap-3.5">
          <Button
            disabled={!isPreviousProposalAvailable}
            onClick={showPreviousProposal}
            className={navigationButtonClassName}
          >
            Previous
          </Button>
          <Button
            disabled={!isNextProposalAvailable}
            onClick={showNextProposal}
            className={navigationButtonClassName}
          >
            Next
          </Button>
        </div>
      </footer>
      {loadingNextProposal && (
        <div className="absolute bottom-px h-1 w-full animate-pulse rounded-md bg-gradient-to-r from-neutral-200 via-neutral-200 via-neutral-300 via-neutral-300 to-neutral-200" />
      )}
    </WidgetBase>
  );
};
