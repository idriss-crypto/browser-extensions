import { classes } from '../../utils';
import { IconButton } from '../icon-button';

import { PaginationComponentProperties } from './pagination.types';

export const PaginationComponent = ({
  pagination,
  buttonClassNames,
}: PaginationComponentProperties) => {
  const { hasPrevious, hasNext, onPrevious, onNext } = pagination;

  if (!hasPrevious && !hasNext) {
    return;
  }
  return (
    <div className="text-gray-700 flex justify-end gap-[10px]">
      <IconButton
        disabled={!hasPrevious}
        onClick={onPrevious}
        iconProps={{ name: 'ArrowLeftIcon' }}
        className={classes('px-1', buttonClassNames)}
      />
      <IconButton
        disabled={!hasNext}
        onClick={onNext}
        iconProps={{ name: 'ArrowRightIcon' }}
        className={classes('px-1', buttonClassNames)}
      />
    </div>
  );
};
