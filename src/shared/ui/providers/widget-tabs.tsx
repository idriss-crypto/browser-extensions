import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';

interface WidgetTabsContextType {
  organizationPreferredApplication: Record<
    string,
    WidgetTabCompatibleApplication | undefined
  >;
  organizationTabs: Record<string, WidgetTabCompatibleApplication[]>;
  setPreferredApplication: (
    organizationId: string,
    application: WidgetTabCompatibleApplication | undefined,
  ) => void;
  addWidgetTab: (
    organizationId: string,
    application: WidgetTabCompatibleApplication,
  ) => void;
  removeWidgetTab: (
    organizationId: string,
    application: WidgetTabCompatibleApplication,
  ) => void;
}

export type WidgetTabCompatibleApplication = 'snapshot' | 'tally' | 'agora';
const WidgetTabsContext = createContext<WidgetTabsContextType | null>(null);

export const WidgetTabsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [organizationTabs, setOrganizationTabs] = useState<
    Record<string, WidgetTabCompatibleApplication[]>
  >({});

  const [
    organizationPreferredApplication,
    setOrganizationPrefferedApplication,
  ] = useState<Record<string, WidgetTabCompatibleApplication | undefined>>({});

  const setPreferredApplication = useCallback(
    (
      organizationId: string,
      application: WidgetTabCompatibleApplication | undefined,
    ) => {
      setOrganizationPrefferedApplication((previous) => {
        return {
          ...previous,
          [organizationId]: application,
        };
      });
    },
    [],
  );

  const addWidgetTab = useCallback(
    (organizationId: string, application: WidgetTabCompatibleApplication) => {
      setOrganizationTabs((previous) => {
        const orgData = previous[organizationId] ?? [];
        if (orgData.includes(application)) {
          return previous;
        }

        return {
          ...previous,
          [organizationId]: [...orgData, application].sort(),
        };
      });
    },
    [],
  );

  const removeWidgetTab = useCallback(
    (organizationId: string, application: WidgetTabCompatibleApplication) => {
      setOrganizationTabs((previous) => {
        const orgData = previous[organizationId];
        if (!orgData) {
          return previous;
        }
        return {
          ...previous,
          [organizationId]: orgData.filter((w) => {
            return w !== application;
          }),
        };
      });

      setOrganizationPrefferedApplication((previous) => {
        const orgData = previous[organizationId];
        if (!orgData) {
          return previous;
        }

        return {
          ...previous,
          [organizationId]: undefined,
        };
      });
    },
    [],
  );

  useEffect(() => {
    const updates: Record<string, WidgetTabCompatibleApplication | undefined> =
      {};

    for (const organizationId of Object.keys(organizationTabs)) {
      const preferredApplication =
        organizationPreferredApplication[organizationId];

      const tabs = organizationTabs[organizationId] ?? [];
      if (!preferredApplication && tabs[0]) {
        updates[organizationId] = tabs[0];
      }
    }

    if (Object.keys(updates).length > 0) {
      setOrganizationPrefferedApplication((previous) => {
        return {
          ...previous,
          ...updates,
        };
      });
    }
  }, [organizationPreferredApplication, organizationTabs]);

  return (
    <WidgetTabsContext.Provider
      value={{
        organizationPreferredApplication,
        organizationTabs,
        setPreferredApplication,
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
