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

  return (
    <WidgetBase
      className={classes(
        'z-10 overflow-visible rounded-lg bg-[#2d2d2d] text-xs leading-tight',
        className,
        { 'z-20': handlePreferredApplication === application },
      )}
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
        style={{ left }}
        className={classes(
          'border-bottom-[5px] absolute -top-5 flex h-[25px] w-[100px] cursor-pointer flex-row gap-[10px] rounded-tl-[2px] rounded-tr-[20px] border-solid pl-1 pt-1 font-bold',
          {
            'border-[#2d2d2d] bg-[#2d2d2d]': application === 'snapshot',
            'border-white bg-white': application !== 'snapshot',
            'brightness-75': handlePreferredApplication !== application,
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
