import { Chip, IconButton, WidgetBase, classes } from 'shared/ui';
import { getDifferenceInDays, getEndsInLabel } from 'shared/utils';

import { ProposalData } from '../types';
import { getProposalAuthor, getProposalUrl, getUserUrl } from '../utils';

interface Properties {
  data: ProposalData;
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
  data,
  className,
  top,
  isPreviousProposalAvailable,
  isNextProposalAvailable,
  isLoading,
  onClose,
  onPrevious,
  onNext,
}: Properties) => {
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
        <a
          href={getUserUrl(data.author.address)}
          className="text-[#aaa]"
          target="_blank"
          rel="noopener noreferrer"
        >
          By {getProposalAuthor(data)}
        </a>
        <Chip>Active</Chip>
      </header>
      <main className="mt-2">
        <p className="line-clamp-[1] text-base font-semibold">{data.title}</p>
        <p className="mt-1 line-clamp-[2] overflow-hidden text-[#ccc]">
          {data.body}
        </p>
      </main>
      <footer className="mt-2 flex items-center justify-between">
        <div className="flex items-center justify-start gap-1.5">
          <div className="text-[#aaa]">
            {getEndsInLabel(getDifferenceInDays(data.end * 1000))}
          </div>
          <a
            href={getProposalUrl(data.space.id, data.id)}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Chip className="py-1" variant="info" width="long">
              Vote
            </Chip>
          </a>
        </div>
        {(isPreviousProposalAvailable || isNextProposalAvailable) && (
          <div className="flex justify-end gap-[18px]">
            <IconButton
              disabled={!isPreviousProposalAvailable}
              onClick={onPrevious}
              iconProps={{ name: 'ArrowLeftIcon' }}
              className="bg-transparent px-0 hover:enabled:bg-transparent active:enabled:bg-transparent"
            />
            <IconButton
              disabled={!isNextProposalAvailable}
              onClick={onNext}
              iconProps={{ name: 'ArrowRightIcon' }}
              className="bg-transparent px-0 hover:enabled:bg-transparent active:enabled:bg-transparent"
            />
          </div>
        )}
      </footer>
      <div
        className={classes(
          'absolute top-0 h-1 animate-pulse rounded-full bg-gradient-to-r from-stone-300 via-stone-300 via-stone-400 via-stone-500 to-stone-300  delay-75 duration-200',
          isLoading ? 'left-1 w-[98%]' : 'right-1 w-0',
        )}
      />
    </WidgetBase>
  );
};
