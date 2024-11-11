import { Button } from '@idriss-xyz/ui/button';
import Image from 'next/image';
import { SOCIAL_LINK } from '@idriss-xyz/constants';
import { GradientBorder } from '@idriss-xyz/ui/gradient-border';

import background from './background.png';
import { ImageSequencer } from '../image-sequencer';

const BASE_NAME = `token-coin-spin/IDRISS_COIN_`;
const images = Array.from(Array(91).keys()).map(
  (_, index) => `${BASE_NAME}${index.toString().padStart(4, '0')}.png`,
);

export const TokenSection = () => {
  return (
    <div className="relative z-1" id="dao">
      <div className="container flex justify-center py-10 lg:py-[169px]">
        <div className="relative flex flex-col items-center rounded-[36px] bg-white/50 px-4 py-10 backdrop-blur-[45px] lg:w-max lg:px-16 lg:py-20">
          <GradientBorder
            borderRadius={36}
            borderWidth={1}
            gradientDirection="toTop"
            gradientStartColor="#5FEB3C"
            gradientStopColor="rgba(145,206,154,0.50)"
          />
          <ImageSequencer
            images={images}
            className="size-[88px] lg:size-[200px]"
            direction='backward'
            
          />
          <h2 className="mt-6 text-display6 gradient-text lg:text-display3">
            IDRISS DAO
          </h2>
          <p className="mt-4 max-w-[597px] text-center text-body3 text-neutralGreen-900 lg:text-body2">
            Work together, earn together. This is the original promise of
            decentralized organizations. IDRISS is on a path to become a DAO,
            giving the community true ownership in its success.
          </p>
          <div className="mt-10 flex w-full flex-col space-y-6 lg:mt-[60px] lg:flex-row lg:justify-center lg:space-x-6 lg:space-y-0">
            <Button
              className="w-full lg:w-auto"
              intent="primary"
              size="large"
              prefixIconName="TwitterX"
              suffixIconName="IdrissArrowRight"
              href={SOCIAL_LINK.X}
              isExternal
              asLink
            >
              FOLLOW FOR UPDATES
            </Button>
          </div>
        </div>
        <Image
          src={background}
          className="pointer-events-none absolute left-0 top-0 -z-1 overflow-visible lg:size-full lg:object-cover"
          alt=""
        />
      </div>
    </div>
  );
};
