import { ReactNode, useMemo, useState } from 'react';
import * as Portal from '@radix-ui/react-portal';

import { usePortal } from '../../providers/with-portal';
import { IconButton } from '../icon-button';
import { classes } from '../../utils';

import { Backdrop } from './backdrop';

type Properties = {
  header: ReactNode;
  children: ReactNode;
  isOpened: boolean;
  onClose: () => void;
  className?: string;
  backdropClassName?: string;
  closeOnHoverAway?: boolean;
  closeOnClickAway?: boolean;
  onClickInside?: () => void;
  width?: number;
  left?: number;
  right?: number;
  top?: number;
  withoutPortal?: boolean;
};

export const Modal = ({
  children,
  header,
  isOpened,
  onClose,
  className,
  backdropClassName,
  closeOnHoverAway,
  closeOnClickAway,
  onClickInside,
  width,
  left,
  right,
  top,
  withoutPortal,
}: Properties) => {
  const [fakePortal, setFakePortal] = useState<HTMLDivElement | null>(null);
  const { portal } = usePortal();

  const shouldBeCentered = useMemo(() => {
    return [left, right, top].every((value) => {
      return value === undefined;
    });
  }, [left, right, top]);

  if (!isOpened) {
    return null;
  }

  return (
    <div ref={setFakePortal}>
      <Portal.Root container={withoutPortal ? fakePortal : portal}>
        <Backdrop
          className={classes(
            'fixed inset-0 bg-neutral-400/60',
            backdropClassName,
          )}
          onClick={closeOnClickAway ? onClose : undefined}
          onHover={closeOnHoverAway ? onClose : undefined}
          hoverActionDelay={1500}
        />
        <div
          className={classes(
            'rounded-xl bg-white',
            shouldBeCentered
              ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
              : 'absolute',
            className,
          )}
          style={{
            width,
            left,
            right,
            top,
          }}
          onClick={onClickInside}
        >
          <div className="pr-8">{header}</div>
          <div className="mt-6">{children}</div>
          <IconButton
            onClick={onClose}
            className="absolute right-3 top-3"
            intent="tertiary"
            size="medium"
            iconName="X"
          />
        </div>
      </Portal.Root>
    </div>
  );
};
