import { classes } from '@idriss-xyz/ui/utils';

import { CreatorsSection } from './creators-section';
import { ExtensionSection } from './extension-section';
import { PredictionMarketsSection } from './prediction-markets-section';

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
