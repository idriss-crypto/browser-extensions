import React, { ReactNode } from 'react';
import { classes } from '../../utils';

interface MarqueeProps {
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
}: MarqueeProps) => {
  return (
    <div
      className={classes(
        'group relative mt-4 flex items-center justify-start overflow-clip side-blur',
        className,
      )}
    >
      {/* Duplicate for seamless looping */}
      {[0, 1, 2].map((duplicate) => (
        <div
          key={duplicate}
          className={classes(
            'inset-0 flex flex-none animate-marquee gap-x-10 whitespace-nowrap mx-5',
            pauseOnHover && 'group-hover:paused-animation group-focus-within:paused-animation',
          )}
          style={{
            animationDuration: `${speed}s`,
            transform: `translateX(${duplicate * 100}%)`,
          }}
          role="list"
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={`${duplicate}-${index}`}
              className="flex cursor-pointer items-center space-x-2"
            >
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
