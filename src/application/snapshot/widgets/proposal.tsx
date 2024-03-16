import { classes } from 'shared/ui/utils';
import { Chip, WidgetBase } from 'shared/ui/components';

import { ProposalData } from '../types';
import {
  getDaysUntil,
  getEndsInLabel,
  getProposalAuthor,
  getProposalUrl,
  getUserUrl,
} from '../utils';

interface Properties {
  data: ProposalData;
  className?: string;
  top?: number;
  onHide?: () => void;
}

export const Proposal = ({ data, className, top, onHide }: Properties) => {
  return (
    <WidgetBase
      className={classes(
        'right-4 w-96 rounded-lg bg-[#2d2d2d] p-3 text-xs leading-tight',
        className,
      )}
      top={top}
      onHide={onHide}
    >
      <header className="flex content-between items-center space-x-3">
        <a
          href={getUserUrl(data.author.address)}
          target="_blank"
          rel="noopener noreferrer"
        >
          By {getProposalAuthor(data)}
        </a>
        <Chip className="bg-green-600">Active</Chip>
      </header>
      <main className="mt-3">
        <p className="text-sm">{data.title}</p>
        <p className="mt-1 overflow-hidden text-[#ccc]">
          ${data.body.slice(0, 120)}...
        </p>
      </main>
      <footer className="mt-2 flex items-center space-x-2">
        <div className="text-[#aaa]">
          {getEndsInLabel(getDaysUntil(data.end * 1000))}
        </div>
        <a
          href={getProposalUrl(data.space.id, data.id)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Chip className="bg-white text-[#1c1b20]">Vote</Chip>
        </a>
      </footer>
    </WidgetBase>
  );
};
