import { useCallback, useState } from 'react';

import { IconButton } from '../icon-button';

import { WidgetBaseProperties } from './widget-base.types';

// TODO: make it polymorhpic
export const WidgetBase = ({
  children,
  className,
  onHide,
  top,
}: WidgetBaseProperties) => {
  const [isVisible, setIsVisible] = useState(true);

  const hide = useCallback(() => {
    onHide?.();
    setIsVisible(false);
  }, [onHide]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        top, // TODO: style won't be needed but need to write scoped css variable and read it from tailwind
      }}
    >
      {children}
      <IconButton
        onClick={hide}
        className="absolute right-2 top-2 flex cursor-pointer items-center justify-center bg-transparent"
        iconProps={{
          name: 'Cross2Icon',
          size: 16,
          className: 'text-[#aaa]',
        }}
      />
    </div>
  );
};
