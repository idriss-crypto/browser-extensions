import {
  ExtensionAddressBookSettingName,
  ExtensionGovernanceSettingName,
  ExtensionIntegrationSettingName,
  ExtensionSettingsStorageKey,
} from 'shared/extension';

import { SettingListItem, SettingListItemsGroup } from './types';

// const tradingCopilotSettings: SettingListItem<ExtensionTradingCopilotSettingName>[] =
//   [
//     {
//       label: 'Latest transactions',
//       storageKey: 'trading-copilot-latest-transactions-enabled',
//     },
//     {
//       label: 'Notifications',
//       storageKey: 'trading-copilot-notifications-enabled',
//     },
//   ];

const addressBookSettings: SettingListItem<ExtensionAddressBookSettingName>[] =
  [
    {
      label: 'Tipping',
      storageKey: 'idriss-send-enabled',
    },
    {
      label: 'Block explorers',
      storageKey: 'wallet-lookup-enabled',
    },
  ];

const governanceSettings: SettingListItem<ExtensionGovernanceSettingName>[] = [
  {
    label: 'Agora',
    storageKey: 'agora-enabled',
  },
  {
    label: 'Snapshot',
    storageKey: 'snapshot-enabled',
  },
  {
    label: 'Tally',
    storageKey: 'tally-enabled',
  },
];

const integrationsSettings: SettingListItem<ExtensionIntegrationSettingName>[] =
  [
    {
      label: 'Polymarket',
      storageKey: 'polymarket-enabled',
    },
    {
      label: 'Gitcoin',
      storageKey: 'gitcoin-enabled',
    },
  ];

export const settingListItemGroups: SettingListItemsGroup<ExtensionSettingsStorageKey>[] =
  [
    // {
    //   label: 'Trading Copilot',
    //   labelSuffixElement: (
    //     <NavigateButton
    //       iconName="ChevronRightIcon"
    //       navigateURL={EXTENSION_POPUP_ROUTE.TRADING_COPILOT}
    //     />
    //   ),
    //   settingListItems: tradingCopilotSettings,
    // },
    { label: 'Address Book', settingListItems: addressBookSettings },
    { label: 'Governance', settingListItems: governanceSettings },
    { label: 'Integrations', settingListItems: integrationsSettings },
  ];
