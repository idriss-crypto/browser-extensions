'use client';
import Image from 'next/image';
import { Tabs } from './tabs';
import { ProductInfo } from './product-info';
import { circleWithScreen } from '../assets';
import { Icon, IconName } from '@idriss-xyz/ui/icon';
import { ReactElement } from 'react';

type ProductSectionProperties = {
  defaultOption: 'Extension' | 'Creators' | 'Prediction Market';
  onOptionChange: (option: string) => void;
  title: string;
  description: string;
  actions: ReactElement;
  features: ProductSectionFeature[];
  readOnly: boolean;
};
type ProductSectionFeature = {
  icon: IconName;
  title: string;
  describtion?: string;
};
export type ProductSectionInfo = {
  title: string;
  describtion: string;
  features: ProductSectionFeature[];
};

export const ProductSection = ({
  defaultOption,
  onOptionChange,
  title,
  description,
  actions,
  features,
  readOnly,
}: ProductSectionProperties) => {
  return (
    <div className="relative flex size-full bg-mint-100">
      <div className="padding-1100 flex size-full flex-col bg-[linear-gradient(114deg,_#022B1E_34.81%,_#079165_123.57%)] px-[120px] py-[80px]">
        <div className="gap-1100 container flex max-h-[670px] flex-col gap-[104px]">
          <div className="gap-1100 flex flex-col items-start gap-[64px]">
            <Tabs
              options={['Extension', 'Creators', 'Prediction Market']}
              defaultOption={defaultOption}
              readOnly={readOnly}
              onChange={onOptionChange}
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-balance text-display5 text-midnightGreen-100 lg:text-display2">
                {title}
              </h2>
              <p className="w-[60%] text-balance text-body3 text-midnightGreen-200 lg:text-body2">
                {description}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 lg:flex-row">
              {actions}
            </div>
          </div>
          <div className="grid size-fit flex-wrap items-start gap-3 lg:grid-cols-2">
            {features.map((feature) => {
              return (
                <ProductInfo
                  key={feature.title}
                  icon={<Icon name={feature.icon} size={65} className="" />}
                  title={feature.title}
                  description={feature.describtion}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Image
        priority
        src={circleWithScreen}
        alt=""
        className="absolute bottom-0 right-0 top-[50%] max-w-[45%] translate-y-[-50%]"
      />
    </div>
  );
};
