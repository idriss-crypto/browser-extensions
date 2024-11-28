import * as RadixDialog from '@radix-ui/react-dialog';
import { IconButton } from '@idriss-xyz/ui/icon-button';

import { TailwindProvider } from 'shared/ui';

import { DialogProperties } from './dialog.types';

export const DialogComponent = ({
  open,
  children,
  title,
  closeDialog,
}: DialogProperties) => {
  return (
    <RadixDialog.Root open={open}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed left-0 top-0 z-portal size-full bg-neutralGreen-900/50" />
        <RadixDialog.Content className="fixed left-0 top-0 z-portal flex size-full items-center justify-center overflow-hidden">
          <TailwindProvider>
            <div className="flex w-[400px] flex-col gap-y-5 rounded-lg bg-white p-5">
              <RadixDialog.Title className="flex flex-row items-center justify-between text-heading4 text-neutral-900">
                {title}
                <IconButton
                  intent="tertiary"
                  size="medium"
                  iconName="X"
                  onClick={closeDialog}
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
