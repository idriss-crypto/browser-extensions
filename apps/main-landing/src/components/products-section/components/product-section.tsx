'use client';
import Image from 'next/image';
import { Tabs } from './tabs';
import { ProductInfo } from './product-info';
import { circleWithScreen } from '../assets';
import { Icon, IconName } from '@idriss-xyz/ui/icon';
import { ReactElement } from 'react';
import { tabOptions } from '../constants';
import { TabOption } from '../types';
import { classes } from '@idriss-xyz/ui/utils';

type ProductSectionProperties = {
  activeOptionKey: string;
  onOptionChange: (option: TabOption) => void;
  title: string;
  description: string;
  actions: ReactElement;
  features: ProductSectionFeature[];
  readOnly: boolean;
  className?: string;
  fadeOut: boolean;
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
  className,
  activeOptionKey,
  onOptionChange,
  title,
  description,
  actions,
  features,
  readOnly,
  fadeOut,
}: ProductSectionProperties) => {
  return (
    <div className={classes("relative flex size-full bg-mint-100", className)}>
      <div className="flex size-full flex-col bg-[linear-gradient(114deg,_#022B1E_34.81%,_#079165_123.57%)] px-[120px] py-[80px] padding-1100">
        <div className="container flex flex-col gap-[104px] gap-1100">
          <div className="flex flex-col items-start gap-[64px] gap-1100">
            <Tabs
              options={tabOptions}
              activeOptionKey={activeOptionKey}
              readOnly={readOnly}
              onChange={onOptionChange}
            />
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden">
                <h2
                  className={classes(
                    'text-balance text-display5 text-midnightGreen-100 transition-transform duration-1000 lg:text-display2',
                    fadeOut && 'translate-y-[-110%]',
                  )}
                >
                  {title}
                </h2>
              </div>
              <div className="overflow-hidden">
                <p
                  className={classes(
                    'w-[60%] text-balance text-body3 text-midnightGreen-200 transition-transform duration-1000 lg:text-body2',
                    fadeOut && 'translate-y-[-110%]',
                  )}
                >
                  {description}
                </p>
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className={classes(
                  'flex flex-col items-center gap-2 transition-transform duration-1000 lg:flex-row',
                  fadeOut && 'translate-y-[-110%]',
                )}
              >
                {actions}
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={classes(
                'grid size-fit flex-wrap items-start gap-3 transition-transform duration-1000 lg:grid-cols-2',
                fadeOut && 'translate-y-[-110%]',
              )}
            >
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
