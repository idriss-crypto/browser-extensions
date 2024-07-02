import { ReactNode, useEffect, useMemo } from 'react';

import { WidgetBaseProperties } from '../widget-base/widget-base.types';
import { useWidgetTabs } from '../../providers/widget-tabs';
import { WidgetBase } from '../widget-base';
import { classes } from '../../utils/classes';

import { TabHandle } from './tab-handle.component';

interface WidgetTabProperties extends WidgetBaseProperties {
  twitterHandle: string;
  tabName: string;
  tabImage?: string;
  children: ReactNode;
  theme: 'bright' | 'dark';
}

export const WidgetTab = ({
  theme,
  twitterHandle,
  tabImage,
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

  return (
    <WidgetBase
      className={classes(
        'z-10 overflow-visible rounded-lg bg-[#2d2d2d] text-xs leading-tight',
        className,
        {
          'z-20': userPreferredTab === tabName,
          'rounded-tl-none': userTabs.length > 1,
        },
      )}
      top={top}
      onClose={() => {
        onClose && onClose();
        removeWidgetTab(twitterHandle, tabName);
      }}
      closeButtonClassName={closeButtonClassName}
    >
      {userTabs.length > 1 && (
        <TabHandle
          imageSrc={tabImage}
          isActive={userPreferredTab === tabName}
          left={left}
          name={tabName}
          onClick={() => {
            setUserPreferredTab(twitterHandle, tabName);
          }}
          theme={theme}
        />
      )}
      {children}
    </WidgetBase>
  );
};
