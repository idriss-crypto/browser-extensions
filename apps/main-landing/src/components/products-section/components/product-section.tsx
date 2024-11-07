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
    <div className="relative flex size-full flex-col items-center gap-[120px] bg-mint-100 p-[50px]">
      <div className="flex size-full flex-col items-start gap-[10px] rounded-[40px] bg-[linear-gradient(114deg,_#022B1E_34.81%,_#079165_123.57%)] px-[120px] py-[80px]">
        <div className="container flex flex-col items-start gap-[104px]">
          <div className="flex flex-col items-start gap-[64px]">
            <Tabs
              options={['Extension', 'Creators', 'Prediction Market']}
              defaultOption={defaultOption}
              readOnly={readOnly}
              onChange={onOptionChange}
            />
            <div className="flex flex-col items-start gap-4">
              <h2 className="text-balance text-display2 text-midnightGreen-100">
                {title}
              </h2>
              <p className="w-[50%] text-balance text-body2 text-midnightGreen-200">
                {description}
              </p>
            </div>
            <div className="flex items-start gap-4">{actions}</div>
          </div>
          <div className="flex flex-col items-start justify-end gap-3 self-stretch">
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
        className="absolute bottom-0 right-0 max-w-[45%] translate-x-[-6%] translate-y-[-18%]"
      />
    </div>
  );
};
