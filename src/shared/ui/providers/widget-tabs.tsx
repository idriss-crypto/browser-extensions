import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';

interface WidgetTabsContextType {
  preferredTab: Record<string, string | undefined>;
  tabs: Record<string, string[]>;
  setUserPreferredTab: (userHandle: string, tab: string | undefined) => void;
  addWidgetTab: (userHandle: string, tab: string) => void;
  removeWidgetTab: (userHandle: string, tab: string) => void;
}

const WidgetTabsContext = createContext<WidgetTabsContextType | null>(null);

export const WidgetTabsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tabs, setTabs] = useState<Record<string, string[]>>({});

  const [preferredTab, setPreferredTab] = useState<
    Record<string, string | undefined>
  >({});

  const setUserPreferredTab = useCallback(
    (userHandle: string, tab: string | undefined) => {
      setPreferredTab((previous) => {
        return {
          ...previous,
          [userHandle]: tab,
        };
      });
    },
    [],
  );

  const addWidgetTab = useCallback((userHandle: string, tab: string) => {
    setTabs((previous) => {
      const givenUserTabs = previous[userHandle] ?? [];
      if (givenUserTabs.includes(tab)) {
        return previous;
      }

      return {
        ...previous,
        [userHandle]: [...givenUserTabs, tab].sort(),
      };
    });
  }, []);

  const removeWidgetTab = useCallback((userHandle: string, tab: string) => {
    setTabs((previous) => {
      const givenUserTabs = previous[userHandle];
      if (!givenUserTabs) {
        return previous;
      }
      return {
        ...previous,
        [userHandle]: givenUserTabs.filter((t) => {
          return t !== tab;
        }),
      };
    });

    setPreferredTab((previous) => {
      if (previous[userHandle] === tab) {
        return {
          ...previous,
          [userHandle]: undefined,
        };
      }
      return previous;
    });
  }, []);

  useEffect(() => {
    const preferredTabUpdates: Record<string, string | undefined> = {};

    for (const userHandle of Object.keys(tabs)) {
      const userPreferredTab = preferredTab[userHandle];

      const userTabs = tabs[userHandle] ?? [];
      if (!userPreferredTab && userTabs[0]) {
        preferredTabUpdates[userHandle] = userTabs[0];
      }
    }

    if (Object.keys(preferredTabUpdates).length > 0) {
      setPreferredTab((previous) => {
        return {
          ...previous,
          ...preferredTabUpdates,
        };
      });
    }
  }, [preferredTab, tabs]);

  return (
    <WidgetTabsContext.Provider
      value={{
        preferredTab,
        tabs,
        setUserPreferredTab,
        addWidgetTab,
        removeWidgetTab,
      }}
    >
      {children}
    </WidgetTabsContext.Provider>
  );
};

export const useWidgetTabs = () => {
  const context = useContext(WidgetTabsContext);
  if (!context) {
    throw new Error('useWidgetTabs must be used within a WidgetTabsProvider');
  }

  return context;
};
