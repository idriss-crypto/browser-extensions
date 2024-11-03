import { Children, ReactNode } from 'react';

import { classes } from '../../utils';

interface MarqueeProperties {
  children: ReactNode;
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee = ({
  children,
  pauseOnHover = true,
  className,
}: MarqueeProperties) => {
  return (
    <div
      className={classes(
        'group relative mt-4 flex items-center justify-start overflow-clip side-blur',
        className,
      )}
    >
      <div
        className={classes(
          'mx-0 flex flex-none animate-marquee gap-x-0 whitespace-nowrap lg:mx-5 lg:gap-x-10',
          pauseOnHover &&
            'group-focus-within:paused-animation group-hover:paused-animation',
        )}
        role="list"
      >
        {Children.map(children, (child, index) => {
          return (
            <div
              key={index}
              className="flex cursor-pointer items-center space-x-2"
            >
              {child}
            </div>
          );
        })}
      </div>

      <div
        className={classes(
          'absolute mx-0 flex flex-none animate-marquee2 gap-x-0 whitespace-nowrap lg:mx-5 lg:gap-x-10 lg:pl-5',
          pauseOnHover &&
            'group-focus-within:paused-animation group-hover:paused-animation',
        )}
        role="list"
      >
        {Children.map(children, (child, index) => {
          return (
            <div
              key={index}
              className="flex cursor-pointer items-center space-x-2"
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};
