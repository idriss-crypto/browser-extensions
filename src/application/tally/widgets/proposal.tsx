import { classes } from 'shared/ui/utils';
import { Chip, WidgetBase } from 'shared/ui/components';
import { getDifferenceInDays, getEndsInLabel } from 'shared/utils';
import { NavigationButton } from 'application/agora/components';

import { ProposalData } from '../types';
import { getProposalUrl, getUserUrl } from '../utils';

interface Properties {
  proposalDetails: ProposalData;
  className?: string;
  top?: number;
  isPreviousProposalAvailable: boolean;
  isNextProposalAvailable: boolean;
  isLoading: boolean;
  onClose?: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const Proposal = ({
  proposalDetails,
  className,
  top,
  isPreviousProposalAvailable,
  isNextProposalAvailable,
  isLoading,
  onClose,
  onPrevious,
  onNext,
}: Properties) => {
  const proposalEndDateInMs = new Date(proposalDetails.end.timestamp).getTime();

  return (
    <WidgetBase
      className={classes(
        'grid h-[200px] overflow-hidden rounded-md bg-white text-xs leading-tight',
        className,
      )}
      top={top}
      onClose={onClose}
    >
      <header className="mb-auto flex items-center justify-between space-x-3">
        <p className="line-clamp-[1] text-xs font-semibold text-gray-700">
          <a
            href={getUserUrl(proposalDetails.organization.slug ?? '')}
            className="text-[#aaa]"
            target="_blank"
            rel="noopener noreferrer"
          >
            By {proposalDetails.organization.name}
          </a>
        </p>
        <Chip className="rounded-sm bg-green-200 px-1 py-0.5 font-semibold uppercase text-green-600">
          {proposalDetails.status.toUpperCase()}
        </Chip>
      </header>
      <main className="mt-2 grid">
        <p className="line-clamp-[1] text-base font-black text-black">
          {proposalDetails.metadata.title}
        </p>
        <p className="mt-1 line-clamp-[4] overflow-hidden text-[#374151]">
          {proposalDetails.metadata.description}
        </p>
      </main>
      <footer className="mt-auto flex items-center justify-between">
        <div className="flex justify-start gap-3.5">
          <div className="flex items-center text-xs font-semibold text-gray-700">
            {getEndsInLabel(getDifferenceInDays(proposalEndDateInMs))}
          </div>
          <a
            href={getProposalUrl(
              proposalDetails.organization.slug,
              proposalDetails.id,
            )}
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
          <NavigationButton
            disabled={!isPreviousProposalAvailable}
            onClick={onPrevious}
          >
            Previous
          </NavigationButton>
          <NavigationButton
            disabled={!isNextProposalAvailable}
            onClick={onNext}
          >
            Next
          </NavigationButton>
        </div>
      </footer>
      <div
        className={classes(
          'absolute top-0 h-1 animate-pulse rounded-full bg-gradient-to-r from-stone-300 via-stone-300 via-stone-400 via-stone-500 to-stone-300  delay-75 duration-200',
          isLoading ? 'left-0 w-full' : 'right-0 w-0',
        )}
      />
    </WidgetBase>
  );
};
