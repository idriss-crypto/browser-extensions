import { classes } from 'shared/ui/utils';
import { Chip, WidgetBase } from 'shared/ui/components';
import { getDifferenceInDays, getEndsInLabel } from 'shared/utils';
import { NavigationButton } from 'application/agora/components';

import { ProposalData } from '../types';
import {
  getProposalUrl,
  getStatusBadgeColorClassNames,
  getOrganizationUrl,
  getOrganizationDelegateUrl,
} from '../utils';

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
        'grid h-[200px] overflow-hidden rounded-[0.375rem] bg-white text-xs leading-tight',
        className,
      )}
      top={top}
      onClose={onClose}
    >
      <header className="mb-auto flex items-center justify-between space-x-3">
        <p className="line-clamp-[1] text-xs text-black">
          by{' '}
          <a
            href={
              proposalDetails.creator.ens.length > 0
                ? getOrganizationDelegateUrl(
                    proposalDetails.organization.slug ?? '',
                    proposalDetails.creator.ens,
                  )
                : getOrganizationUrl(proposalDetails.organization.slug ?? '')
            }
            className="font-semibold font-semibold text-gray-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {proposalDetails.creator.name ?? proposalDetails.organization.name}
          </a>
        </p>
        <Chip
          className={classes(
            'rounded-sm px-[6px] py-[2px] font-bold uppercase leading-6 tracking-wide',
            getStatusBadgeColorClassNames(proposalDetails.status),
          )}
        >
          {proposalDetails.status}
        </Chip>
      </header>
      <main className="my-2 grid">
        <p className="line-clamp-[1] text-base font-bold tracking-tighter text-gray-900">
          {proposalDetails.metadata.title}
        </p>
        <p className="mt-1 line-clamp-[4] overflow-hidden text-[#374151]">
          {proposalDetails.metadata.description}
        </p>
      </main>
      <footer className="mt-auto flex items-center justify-between">
        <div className="flex justify-start gap-3.5">
          <div className="flex w-[110px] items-center text-xs font-semibold font-semibold leading-5 text-gray-600">
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
              className=" mr-2 inline-flex h-7 select-none items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-semibold leading-6 text-white transition-all duration-200 ease-in-out hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              variant="info"
              width="long"
            >
              {proposalDetails.status.toLowerCase() === 'active'
                ? 'Vote'
                : 'View'}
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
