import { ReactNode, useEffect, useMemo } from 'react';

import {
  WidgetBase,
  WidgetTabCompatibleApplication,
  classes,
  useWidgetTabs,
} from 'shared/ui';

import { WidgetBaseProperties } from '../widget-base/widget-base.types';

import { getProperLogoSource } from './utils';

interface WidgetTabProperties extends WidgetBaseProperties {
  twitterHandle: string;
  application: WidgetTabCompatibleApplication;
  children: ReactNode;
}

const getHundredsDigit = (number: number) => {
  return Math.floor((number % 1000) / 100);
};

export const WidgetTab = ({
  twitterHandle,
  application,
  children,
  className,
  closeButtonClassName,
  onClose,
  top,
}: WidgetTabProperties) => {
  const {
    organizationTabs,
    organizationPreferredApplication,
    addWidgetTab,
    removeWidgetTab,
    setPreferredApplication,
  } = useWidgetTabs();

  const handleWidgetTabs = useMemo(() => {
    return organizationTabs[twitterHandle] ?? [];
  }, [organizationTabs, twitterHandle]);

  const handlePreferredApplication =
    organizationPreferredApplication[twitterHandle];

  const left = useMemo(() => {
    const index = handleWidgetTabs.indexOf(application) ?? -1;
    if (index !== -1) {
      return index * 100;
    }

    return 0;
  }, [application, handleWidgetTabs]);

  useEffect(() => {
    addWidgetTab(twitterHandle, application);

    return () => {
      removeWidgetTab(twitterHandle, application);
    };
  }, [addWidgetTab, application, removeWidgetTab, twitterHandle]);

  const topBasedAdditionalIndex = top ? getHundredsDigit(top) * 100 : 0;

  return (
    <WidgetBase
      className={classes(
        'overflow-visible rounded-lg rounded-tl-none bg-[#2d2d2d] text-xs leading-tight',
        className,
      )}
      zIndex={
        handlePreferredApplication === application
          ? topBasedAdditionalIndex + 20
          : topBasedAdditionalIndex + 10
      }
      top={top}
      onClose={() => {
        onClose && onClose();
        removeWidgetTab(twitterHandle, application);
      }}
      closeButtonClassName={closeButtonClassName}
    >
      <div
        onClick={() => {
          setPreferredApplication(twitterHandle, application);
        }}
        style={{
          left,
        }}
        className={classes(
          'absolute -top-[25px] flex h-[25px] w-[100px] cursor-pointer flex-row items-center gap-[10px] rounded-tl-[2px] rounded-tr-[20px] pl-1 pt-1 font-bold transition-all duration-75 ease-linear',
          {
            'bg-[#2d2d2d]': application === 'snapshot',
            'bg-white': application !== 'snapshot',
            '-top-[23px] -translate-x-[3px] scale-95 brightness-75':
              handlePreferredApplication !== application,
          },
        )}
      >
        <img className="h-3/4" src={getProperLogoSource(application)} />
        <span
          className={classes({
            'text-white': application === 'snapshot',
            'text-black': application !== 'snapshot',
          })}
        >
          {application}
        </span>
      </div>
      {children}
    </WidgetBase>
  );
};
