import { ReactNode, useEffect, useMemo } from 'react';

import { WidgetBaseProperties } from '../widget-base/widget-base.types';
import { useWidgetTabs } from '../../providers/widget-tabs';
import { WidgetBase } from '../widget-base';
import { classes } from '../../utils/classes';

import { getProperLogoSource } from './utils';

interface WidgetTabProperties extends WidgetBaseProperties {
  twitterHandle: string;
  tabName: string;
  children: ReactNode;
}

const getHundredsDigit = (number: number) => {
  return Math.floor((number % 1000) / 100);
};

export const WidgetTab = ({
  twitterHandle,
  tabName,
  children,
  className,
  closeButtonClassName,
  onClose,
  top,
}: WidgetTabProperties) => {
  const {
    tabs,
    preferredTab,
    addWidgetTab,
    removeWidgetTab,
    setUserPreferredTab,
  } = useWidgetTabs();

  const tabLogo = getProperLogoSource(tabName);

  const userTabs = useMemo(() => {
    return tabs[twitterHandle] ?? [];
  }, [tabs, twitterHandle]);

  const userPreferredTab = preferredTab[twitterHandle] ?? userTabs.at(0);

  const left = useMemo(() => {
    const index = userTabs.indexOf(tabName) ?? -1;
    if (index !== -1) {
      return index * 100;
    }

    return 0;
  }, [tabName, userTabs]);

  useEffect(() => {
    addWidgetTab(twitterHandle, tabName);

    return () => {
      removeWidgetTab(twitterHandle, tabName);
    };
  }, [addWidgetTab, tabName, removeWidgetTab, twitterHandle]);

  const topBasedAdditionalIndex = top ? getHundredsDigit(top) * 100 : 0;

  return (
    <WidgetBase
      className={classes(
        'overflow-visible rounded-lg rounded-tl-none bg-[#2d2d2d] text-xs leading-tight',
        className,
      )}
      zIndex={
        userPreferredTab === tabName
          ? topBasedAdditionalIndex + 20
          : topBasedAdditionalIndex + 10
      }
      top={top}
      onClose={() => {
        onClose && onClose();
        removeWidgetTab(twitterHandle, tabName);
      }}
      closeButtonClassName={closeButtonClassName}
    >
      <div
        onClick={() => {
          setUserPreferredTab(twitterHandle, tabName);
        }}
        style={{
          left,
        }}
        className={classes(
          'absolute -top-[25px] flex h-[25px] w-[100px] cursor-pointer flex-row items-center gap-[10px] rounded-tl-[2px] rounded-tr-[20px] pl-1 pt-1 font-bold transition-all duration-75 ease-linear',
          {
            'bg-[#2d2d2d]': tabName === 'snapshot',
            'bg-white': tabName !== 'snapshot',
            '-top-[23px] -translate-x-[3px] scale-95 brightness-75':
              userPreferredTab !== tabName,
          },
        )}
      >
        {tabLogo && <img className="h-3/4" src={tabLogo} />}
        <span
          className={classes({
            'text-white': tabName === 'snapshot',
            'text-black': tabName !== 'snapshot',
          })}
        >
          {tabName}
        </span>
      </div>
      {children}
    </WidgetBase>
  );
};
