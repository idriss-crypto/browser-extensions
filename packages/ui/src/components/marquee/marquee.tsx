import { Children, ReactNode } from 'react';

import { classes } from '../../utils';

interface MarqueeProperties {
  children: ReactNode;
  pauseOnHover?: boolean;
  /** Time for one loop in seconds */
  speed?: number;
  className?: string;
}

export const Marquee = ({
  children,
  pauseOnHover = true,
  speed = 35,
  className,
}: MarqueeProperties) => {
  return (
    <div
      className={classes(
        'group relative mt-4 flex items-center justify-start overflow-clip side-blur',
        className,
      )}
    >
      {/* Duplicate for seamless looping */}
      {[0, 1, 2].map((duplicate) => {
        return (
          <div
            key={duplicate}
            className={classes(
              'inset-0 mx-2.5 flex flex-none animate-marquee gap-x-5 whitespace-nowrap lg:mx-5 lg:gap-x-10',
              pauseOnHover &&
                'group-focus-within:paused-animation group-hover:paused-animation',
            )}
            style={{
              animationDuration: `${speed}s`,
              transform: `translateX(${duplicate * 100}%)`,
            }}
            role="list"
          >
            {Children.map(children, (child, index) => {
              return (
                <div
                  key={`${duplicate}-${index}`}
                  className="flex cursor-pointer items-center space-x-2"
                >
                  {child}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
