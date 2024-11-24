import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import {IconButton} from "@idriss-xyz/ui/icon-button";

import { TailwindProvider } from 'shared/ui';

type Properties = {
  open: boolean;
  title: string;
  children: ReactNode;
  closeDialog: () => void
};

export const Dialog = ({ open, children, title, closeDialog }: Properties) => {
  return (
    <RadixDialog.Root open={open}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="z-portal fixed top-0 left-0 size-full bg-neutralGreen-900/50" />
        <RadixDialog.Content className="z-portal fixed top-0 left-0 overflow-hidden flex justify-center items-center size-full">
          <TailwindProvider>
            <div className="bg-white p-6 rounded-xl flex flex-col gap-y-6 w-[440px]">
              <RadixDialog.Title className="flex flex-row justify-between items-center text-heading4 text-neutral-900">
                {title}
                <IconButton
                  intent="tertiary"
                  size="medium"
                  iconName="X"
                  onClick={() => {return closeDialog()}}
                />
              </RadixDialog.Title>
              {children}
            </div>
          </TailwindProvider>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};