import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { ReactNode } from 'react';

import { classes } from 'shared/ui/utils';

interface ScrollAreaProperties extends RadixScrollArea.ScrollAreaProps {
  children: ReactNode;
  className?: string;
  rootClassName?: string
}

export const ScrollArea = ({ 
  children, 
  className, 
  rootClassName,
  ...properties 
}: ScrollAreaProperties) => {
  return (
    <RadixScrollArea.Root className={classes("overflow-hidden", rootClassName)} {...properties}>
    <RadixScrollArea.Viewport className={classes("size-full rounded", className)}>
      {children}
    </RadixScrollArea.Viewport>
    <RadixScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-black/10 transition-colors duration-150 ease-out hover:bg-black/20 data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2"
      orientation="vertical"
    >
      <RadixScrollArea.Thumb className="flex-1 bg-black/20 rounded-[10px] relative hover:bg-black/40 active:bg-black/90 transition-colors duration-150 ease-out before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:size-full before:min-w-[44px] before:min-h-[44px]" />
    </RadixScrollArea.Scrollbar>
    <RadixScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-black/10 transition-colors duration-150 ease-out hover:bg-black/20 data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2"
      orientation="horizontal"
    >
      <RadixScrollArea.Thumb className="flex-1 bg-black/20 rounded-[10px] relative hover:bg-black/40 active:bg-black/90 transition-colors duration-150 ease-out before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:size-full before:min-w-[44px] before:min-h-[44px]" />
    </RadixScrollArea.Scrollbar>
    <RadixScrollArea.Corner className="bg-black/10" />
  </RadixScrollArea.Root>
  );
};