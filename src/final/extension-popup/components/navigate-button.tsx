import { ExtensionPopupRoute, useExtensionPopup } from 'shared/extension';
import { IconButton, IconName } from 'shared/ui';

interface NavigateButtonProperties {
  iconName: IconName;
  navigateURL: ExtensionPopupRoute;
}

export const NavigateButton = ({
  iconName,
  navigateURL,
}: NavigateButtonProperties) => {
  const extensionPopup = useExtensionPopup();

  return (
    <IconButton
      className="hover:text-green-500"
      iconProps={{ name: iconName, size: 20 }}
      onClick={() => {
        extensionPopup.navigate(navigateURL);
      }}
    />
  );
};
