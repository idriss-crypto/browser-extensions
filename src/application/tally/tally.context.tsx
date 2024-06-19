import React, { createContext, useContext, useState } from 'react';

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

const createNewOrganizationsInfoMap = () => {
  return {
    fetchedProposals: [],
    hasMoreProposalsToFetch: true,
  };
};

export const TallyContext = createContext<TallyContextType | null>(null);

export const TallyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [organizationsInfo, setOrganizationsInfo] = useState(
    new Map<string, OrganizationInfo>(),
  );

  const getOrganizationInfo = (tallyName: string) => {
    let organization = organizationsInfo.get(tallyName);
    if (!organization) {
      organization = createNewOrganizationsInfoMap();
      setOrganizationsInfo(
        new Map(organizationsInfo).set(tallyName, organization),
      );
    }
    return organization;
  };

  const addOrganizationFetchedProposals = (
    tallyName: string,
    newProposals: ProposalData[],
  ) => {
    const organization =
      organizationsInfo.get(tallyName) ?? createNewOrganizationsInfoMap();

    const uniqueProposals = [
      ...organization.fetchedProposals,
      ...newProposals,
    ].filter((proposal, index, self) => {
      return (
        index ===
        self.findIndex((t) => {
          return t.id === proposal.id;
        })
      );
    });
    organization.fetchedProposals = uniqueProposals;
    setOrganizationsInfo(
      new Map(organizationsInfo).set(tallyName, organization),
    );
  };

  const setOrganizationHasMoreProposalsToFetch = (
    tallyName: string,
    hasMoreProposalsToFetch: boolean,
  ) => {
    const organization =
      organizationsInfo.get(tallyName) ?? createNewOrganizationsInfoMap();
    organization.hasMoreProposalsToFetch = hasMoreProposalsToFetch;
    setOrganizationsInfo(
      new Map(organizationsInfo).set(tallyName, organization),
    );
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
