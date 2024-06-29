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
      return index * 50;
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
          'border-bottom-[5px] absolute -top-5 h-[25px] w-[50px] cursor-pointer rounded-tl-[2px] rounded-tr-[20px] border-solid pl-1 pt-1',
          {
            'border-[#2d2d2d] bg-[#2d2d2d]': application === 'snapshot',
            'border-white bg-white': application !== 'snapshot',
            'opacity-50': handlePreferredApplication !== application,
          },
        )}
      >
        <img className="h-3/4" src={getProperLogoSource(application)} />
      </div>
      {children}
    </WidgetBase>
  );
};
