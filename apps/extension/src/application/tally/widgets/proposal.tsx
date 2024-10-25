import {
  classes,
  Chip,
  Pagination,
  PaginationComponent,
  PulsingLoadingBar,
  WidgetBase,
} from 'shared/ui';
import { getDifferenceInDays, getEndsInLabel } from 'shared/utils';
import { useEventsLogger } from 'shared/observability';

import { ProposalData } from '../types';
import {
  getProposalUrl,
  getProposalAuthorUrl,
  getProposalAuthorLabel,
} from '../utils';
import { StatusChip } from '../components';
import { EVENT } from '../constants';

interface Properties {
  proposalDetails: ProposalData;
  className?: string;
  pagination: Pagination;
  isLoading: boolean;
  onClose?: () => void;
}

export const Proposal = ({
  proposalDetails,
  className,
  isLoading,
  pagination,
  onClose,
}: Properties) => {
  const proposalEndDateInMs = new Date(proposalDetails.end.timestamp).getTime();
  const eventsLogger = useEventsLogger();

  return (
    <WidgetBase
      className={classes(
        'bg-white text-xs leading-tight text-tally-text-primary',
        className,
      )}
      onClose={onClose}
    >
      <PulsingLoadingBar isLoading={isLoading} />
      <header className="flex items-center justify-between space-x-3">
        <p className="line-clamp-[1] break-all text-xs leading-5 text-tally-gray-500 hover:underline">
          By{' '}
          <a
            href={getProposalAuthorUrl(proposalDetails)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getProposalAuthorLabel(proposalDetails)}
          </a>
        </p>
        <StatusChip status={proposalDetails.status} />
      </header>
      <main className="my-2">
        <p className="line-clamp-[1] break-all text-base font-bold">
          {proposalDetails.metadata.title}
        </p>
        <p className="mt-1 line-clamp-[2] overflow-hidden break-all">
          {proposalDetails.metadata.description}
        </p>
      </main>
      <footer className="mt-3.5 flex items-center justify-between">
        <div className="flex justify-start gap-1.5">
          <div className="flex min-w-[84px] items-center text-xs leading-5 text-tally-gray-500">
            {getEndsInLabel(getDifferenceInDays(proposalEndDateInMs))}
          </div>
          <a
            onClick={() => {
              void eventsLogger.track(EVENT.TALLY_VOTE_CLICKED);
            }}
            href={getProposalUrl(
              proposalDetails.organization.slug,
              proposalDetails.id,
            )}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Chip
              className="mr-2 inline-flex select-none items-center justify-center rounded-md border border-tally-gray-700 bg-tally-gray-700 px-4 py-1 font-semibold text-white transition-all duration-200 ease-in-out hover:bg-tally-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              variant="info"
              width="long"
            >
              Vote
            </Chip>
          </a>
        </div>
        <PaginationComponent pagination={pagination} />
      </footer>
    </WidgetBase>
  );
};
