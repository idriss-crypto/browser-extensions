'use client';

import { ProductSection } from './product-section';
import { CREATORS_INFO } from '../constants';
import { TabOption } from '../types';
import { CreatorsSectionActions } from './creators-section-actions';

type Properties = {
  onOptionChange: (option: TabOption) => void;
  className?: string;
  fadeOut: boolean;
};

export const CreatorsSection = ({
  onOptionChange,
  className,
  fadeOut,
}: Properties) => {
  return (
    <ProductSection
      fadeOut={fadeOut}
      className={className}
      actions={<CreatorsSectionActions />}
      activeOptionKey="creators-product"
      description={CREATORS_INFO.describtion}
      title={CREATORS_INFO.title}
      features={CREATORS_INFO.features}
      onOptionChange={onOptionChange}
      readOnly={false}
    />
  );
};
