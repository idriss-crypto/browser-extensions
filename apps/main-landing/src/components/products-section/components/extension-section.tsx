'use client';

import { ProductSection } from './product-section';
import { BROWSER_EXTENSION_INFO } from '../constants';
import { TabOption } from '../types';
import { ExtensionSectionActions } from './extension-section-actions';

type Properties = {
  onOptionChange: (option: TabOption) => void;
  className?: string;
  fadeOut: boolean;
};

export const ExtensionSection = ({
  onOptionChange,
  className,
  fadeOut,
}: Properties) => {
  return (
    <ProductSection
      fadeOut={fadeOut}
      className={className}
      actions={<ExtensionSectionActions />}
      activeOptionKey="extension-product"
      description={BROWSER_EXTENSION_INFO.describtion}
      title={BROWSER_EXTENSION_INFO.title}
      features={BROWSER_EXTENSION_INFO.features}
      onOptionChange={onOptionChange}
      readOnly={false}
    />
  );
};
