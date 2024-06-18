import React, { createContext, useContext } from 'react';

import { ProposalData } from './types';

interface TallyContextType {
  getOrganizationInfo: (tallyName: string) => OrganizationInfo;
  addOrganizationFetchedProposals: (
    tallyName: string,
    newProposals: ProposalData[],
  ) => void;
  setOrganizationHasMoreProposalsToFetch: (
    tallyName: string,
    hasMoreProposalsToFetch: boolean,
  ) => void;
}

interface OrganizationInfo {
  fetchedProposals: ProposalData[];
  hasMoreProposalsToFetch: boolean;
}

export const TallyContext = createContext<TallyContextType | null>(null);

export const TallyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const organizationsInfo = new Map<string, OrganizationInfo>();

  const getOrganizationInfo = (tallyName: string) => {
    const organization = organizationsInfo.get(tallyName);
    if (organization) {
      return organization;
    } else {
      organizationsInfo.set(tallyName, {
        fetchedProposals: [],
        hasMoreProposalsToFetch: true,
      });

      return organizationsInfo.get(tallyName)!;
    }
  };

  const addOrganizationFetchedProposals = (
    tallyName: string,
    newProposals: ProposalData[],
  ) => {
    const organization = organizationsInfo.get(tallyName);
    if (organization) {
      organization.fetchedProposals = [
        ...organization.fetchedProposals,
        ...newProposals,
      ];
    } else {
      organizationsInfo.set(tallyName, {
        fetchedProposals: newProposals,
        hasMoreProposalsToFetch: true,
      });
    }
  };

  const setOrganizationHasMoreProposalsToFetch = (
    tallyName: string,
    hasMoreProposalsToFetch: boolean,
  ) => {
    const organization = organizationsInfo.get(tallyName);
    if (organization) {
      organization.hasMoreProposalsToFetch = hasMoreProposalsToFetch;
    } else {
      organizationsInfo.set(tallyName, {
        fetchedProposals: [],
        hasMoreProposalsToFetch: hasMoreProposalsToFetch,
      });
    }
  };

  return (
    <TallyContext.Provider
      value={{
        getOrganizationInfo,
        addOrganizationFetchedProposals,
        setOrganizationHasMoreProposalsToFetch,
      }}
    >
      {children}
    </TallyContext.Provider>
  );
};

export const useTallyContext = () => {
  const context = useContext(TallyContext);

  if (!context) {
    throw new Error('useTallyContext must be used inside the TallyProvider');
  }

  return context;
};
