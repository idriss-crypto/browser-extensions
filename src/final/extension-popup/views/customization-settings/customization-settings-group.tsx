import { Controller, useFormContext } from 'react-hook-form';

import {
  ExtensionSettingsStorageKey,
  useExtensionSettings,
  ExtensionSettings,
} from 'shared/extension';
import { Checkbox, Icon } from 'shared/ui';

import { SettingListItemsGroup } from './types';
import {
  getEmptyGroup,
  getFullyEnabledGroup,
  isGroupOnlyPartiallyEnabled,
  isWholeGroupEnabled,
} from './utils';

interface CustomizationSettingsGroupProperties {
  group: SettingListItemsGroup<ExtensionSettingsStorageKey>;
  disabled: boolean;
}

export const CustomizationSettingsGroup = ({
  group,
  disabled,
}: CustomizationSettingsGroupProperties) => {
  const { extensionSettings } = useExtensionSettings();
  const form = useFormContext<ExtensionSettings>();
  const settings = form.watch();

  const everyGroupSettingsEnabled = isWholeGroupEnabled(
    group,
    extensionSettings,
  );
  const onlyPartOfGroupEnabled = isGroupOnlyPartiallyEnabled(
    group,
    extensionSettings,
  );

  const toggleGroup = () => {
    if (everyGroupSettingsEnabled) {
      form.reset({
        ...settings,
        ...getEmptyGroup(group),
      });
      return;
    }

    form.reset({
      ...settings,
      ...getFullyEnabledGroup(group),
    });
  };

  return (
    <>
      <div className="flex flex-row items-center space-x-2 pb-3 pt-2 font-bold">
        <Checkbox
          label={
            <>
              <Checkbox.Label>{group.label}</Checkbox.Label>{' '}
              {group.labelSuffixElement}
            </>
          }
          value={everyGroupSettingsEnabled}
          indicator={
            disabled ? (
              <></>
            ) : onlyPartOfGroupEnabled ? (
              <Icon size={15} name="DividerHorizontalIcon" />
            ) : undefined
          }
          onChange={toggleGroup}
          disabled={disabled}
          title={
            disabled
              ? 'Enable the extension to modify these settings'
              : undefined
          }
        />
      </div>
      <div className="flex flex-col pb-3 last:pb-0">
        {group.settingListItems.map((settingListItem) => {
          return (
            <div
              className="flex flex-row space-x-2 pb-3 pl-7 last:pb-0"
              key={settingListItem.storageKey}
            >
              <Controller
                control={form.control}
                name={settingListItem.storageKey}
                render={({ field }) => {
                  return (
                    <Checkbox
                      {...field}
                      indicator={disabled ? <></> : undefined}
                      disabled={disabled}
                      title={
                        disabled
                          ? 'Enable the extension to modify these settings'
                          : undefined
                      }
                      label={
                        <Checkbox.Label>{settingListItem.label}</Checkbox.Label>
                      }
                    />
                  );
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
