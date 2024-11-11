import { ProductSection } from '../product-section';

import { CreatorsSectionData } from './creators-section-data';

type Properties = {
  className?: string;
  fadeOut: boolean;
};

const CIRCLE_IMAGE_PATH =
  'extension-to-prediction-markets-circle/IDRISS_CIRCLE_0095.png';

export const CreatorsSection = ({ className, fadeOut }: Properties) => {
  return (
    <ProductSection
      fadeOut={fadeOut}
      className={className}
      actions={CreatorsSectionData.actions}
      activeOptionKey={CreatorsSectionData.defaultOptionKey}
      description={CreatorsSectionData.info.description}
      title={CreatorsSectionData.info.title}
      features={CreatorsSectionData.info.features}
      tabsAsLinks={false}
      animated={false}
      circleImage={CIRCLE_IMAGE_PATH}
    />
  );
};
