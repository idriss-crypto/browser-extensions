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
  top,
  theme,
  twitterHandle,
  tabImage,
  tabName,
  children,
  className,
  closeButtonClassName,
  onClose,
}: WidgetTabProperties) => {
  const {
    tabs,
    preferredTab,
    addWidgetTab,
    setUserPreferredTab,
    removeAllUserWidgets,
  } = useWidgetTabs();

  const userTabs = useMemo(() => {
    return tabs[twitterHandle];
  }, [tabs, twitterHandle]);

  const userPreferredTab = preferredTab[twitterHandle] ?? userTabs?.at(0);

  const left = useMemo(() => {
    const index = userTabs?.indexOf(tabName) ?? -1;
    if (index !== -1) {
      return index * 100;
    }

    return 0;
  }, [tabName, userTabs]);

  useEffect(() => {
    addWidgetTab(twitterHandle, tabName);
  }, [addWidgetTab, tabName, twitterHandle]);

  useEffect(() => {
    if (userTabs === null && onClose) {
      onClose();
    }
  }, [onClose, userTabs]);

  if (!userTabs || userTabs.length === 0) {
    return;
  }

  return (
    <WidgetBase
      className={classes(
        'z-10 overflow-visible rounded-[0.375rem] bg-[#2d2d2d] text-xs leading-tight',
        className,
        {
          'z-20': userPreferredTab === tabName,
          'rounded-tl-none': userTabs.length > 1,
        },
      )}
      top={top}
      onClose={() => {
        removeAllUserWidgets(twitterHandle);
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
