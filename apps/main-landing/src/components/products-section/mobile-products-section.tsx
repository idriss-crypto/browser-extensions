import { classes } from '@idriss-xyz/ui/utils';
import { CreatorsSection } from './components/creators-section';
import { ExtensionSection } from './components/extension-section';
import { PredictionMarketsSection } from './components/prediction-markets-section';

type Properties = {
  className?: string;
};

export const MobileProductsSection = ({ className }: Properties) => {
  return (
    <div className={classes('flex flex-col', className)}>
      <ExtensionSection fadeOut={false} onOptionChange={() => {}} />
      <CreatorsSection fadeOut={false} onOptionChange={() => {}} />
      <PredictionMarketsSection fadeOut={false} onOptionChange={() => {}} />
    </div>
  );
};
