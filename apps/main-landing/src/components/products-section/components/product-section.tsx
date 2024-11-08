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
    <div className={classes('relative flex size-full bg-mint-100', className)}>
      <div className="flex size-full flex-col bg-[linear-gradient(114deg,_#022B1E_34.81%,_#079165_123.57%)] px-4 py-10 lg:px-[120px] lg:py-[80px] [@media(max-height:1100px)]:py-[30px]">
        <div className="container flex flex-col gap-10 p-0 lg:gap-[104px] lg:[@media(max-height:1100px)]:gap-[50px] lg:[@media(max-height:770px)]:gap-[30px]">
          <div className="flex flex-col items-start gap-[64px] lg:[@media(max-height:1100px)]:gap-[50px] lg:[@media(max-height:770px)]:gap-[30px]">
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
                    'text-balance text-display5 text-midnightGreen-100 transition-transform duration-1000 [@media(min-width:1181px)]:text-display2',
                    fadeOut && 'translate-y-[-110%]',
                  )}
                >
                  {title}
                </h2>
              </div>
              <div className="overflow-hidden">
                <p
                  className={classes(
                    'text-balance text-body3 text-midnightGreen-200 transition-transform duration-1000 lg:w-[60%] [@media(min-width:1181px)]:text-body2',
                    fadeOut && 'translate-y-[-110%]',
                  )}
                >
                  {description}
                </p>
              </div>
            </div>
            <div className="w-full overflow-hidden px-1 py-1 md:w-fit lg:w-fit">
              <div
                className={classes(
                  'flex flex-col items-center gap-3 transition-transform duration-1000 md:flex-row lg:flex-row lg:gap-2',
                  fadeOut && 'translate-y-[-110%]',
                )}
              >
                {actions}
              </div>
            </div>
            <Image
              priority
              src={circleWithScreen}
              alt=""
              className="bottom-0 right-0 top-[50%] lg:absolute lg:max-w-[45%] lg:translate-y-[-50%] lg:[@media(max-width:1400px)]:translate-y-[-40%] lg:[@media(min-height:1300px)]:translate-y-[-100%]"
            />
          </div>
          <div className="overflow-hidden">
            <div
              className={classes(
                'grid size-fit flex-wrap items-start gap-3 transition-transform duration-1000 md:grid-cols-2 lg:grid-cols-2',
                fadeOut && 'translate-y-[-110%]',
              )}
            >
              {features.map((feature) => {
                return (
                  <ProductInfo
                    key={feature.title}
                    icon={
                      <Icon
                        name={feature.icon}
                        size={65}
                        className="size-10 lg:size-[65px]"
                      />
                    }
                    title={feature.title}
                    description={feature.describtion}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
