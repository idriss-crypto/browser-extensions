'use client';
import Image from 'next/image';
import { Dialog } from '@idriss-xyz/ui/dialog';
import { IconButton } from '@idriss-xyz/ui/icon-button';
import { VisuallyHidden } from '@idriss-xyz/ui/visually-hidden';
import { Button } from '@idriss-xyz/ui/button';

import { APPS_SECTION_NAVIGATION_ITEMS } from '../constants';

import { Section } from './section';
import { Socials } from './socials';

export const MobileNavigation = () => {
  return (
    <nav className="container flex items-center justify-between px-4 py-1">
      <Image
        src="/logo-idriss-dark.png"
        height={24}
        width={98}
        alt=""
        priority
      />
      <Dialog
        className="fixed inset-x-4 bottom-3 top-[76px] flex flex-col rounded-[36px] border border-mint-400 px-4 py-6 text-neutralGreen-900 backdrop-blur-[90px]" // top-[76px] is 64px height of navbar + 12px spacing, ideally it should be ref attached to nav to read component height in case it changes in future
        trigger={({ isOpened }) => {
          return (
            <IconButton
              iconName={isOpened ? 'X' : 'Menu'}
              intent="tertiary"
              size="large"
            />
          );
        }}
      >
        {({ close }) => {
          return (
            <>
              <VisuallyHidden>
                <Dialog.Title>Website navigation</Dialog.Title>
              </VisuallyHidden>
              <div className="space-y-6">
                <Section
                  items={APPS_SECTION_NAVIGATION_ITEMS}
                  title={
                    <Button
                      intent="tertiary"
                      size="large"
                      onClick={close}
                      href="/#"
                      asLink
                    >
                      APPS
                    </Button>
                  }
                  onItemClick={close}
                />
                <Section
                  title={
                    <Button
                      intent="tertiary"
                      size="large"
                      onClick={close}
                      href="/#"
                      asLink
                    >
                      TOKEN
                    </Button>
                  }
                />
                <Section
                  title={
                    <Button
                      intent="tertiary"
                      size="large"
                      onClick={close}
                      href="/#"
                      asLink
                    >
                      DOCS
                    </Button>
                  }
                />
              </div>
              <Socials className="mt-auto" />
            </>
          );
        }}
      </Dialog>
    </nav>
  );
};
