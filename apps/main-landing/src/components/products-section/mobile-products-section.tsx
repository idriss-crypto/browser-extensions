import { classes } from '@idriss-xyz/ui/utils';

import { CreatorsSection } from './components/creators-section/creators-section';
import { ExtensionSection } from './components/extension-section/extension-section';
import { PredictionMarketsSection } from './components/prediction-markets-section/prediction-markets-section';

type Properties = {
  className?: string;
};

export const MobileProductsSection = ({ className }: Properties) => {
  return (
    <div className={classes('flex flex-col', className)}>
      <ExtensionSection fadeOut={false} />
      <CreatorsSection fadeOut={false} />
      <PredictionMarketsSection fadeOut={false} />
    </div>
  );
};
