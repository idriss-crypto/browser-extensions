import { useTwitterPage } from 'shared/twitter';
import { useExtensionSettings } from 'shared/extension';

import { TwitterPolymarketWidget } from './widgets';

export const App = () => {
  const page = useTwitterPage();
  const { experimentalFeatures } = useExtensionSettings();

  if (!experimentalFeatures) {
    return null;
  }

  return <>{page.name === 'twitter' ? <TwitterPolymarketWidget /> : null}</>;
};
