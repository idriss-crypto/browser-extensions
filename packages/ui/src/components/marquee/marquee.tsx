import React, { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
}

export const Marquee = ({ children }: MarqueeProps) => {
  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex whitespace-nowrap animate-marquee hover:paused-animation"
        role="list"
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="flex items-center mx-4 space-x-2 cursor-pointer"
          >
            {child}
          </div>
        ))}
        {/* Duplicate for seamless looping */}
        {React.Children.map(children, (child, index) => (
          <div
            key={`dup-${index}`}
            className="flex items-center mx-4 space-x-2 cursor-pointer"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
