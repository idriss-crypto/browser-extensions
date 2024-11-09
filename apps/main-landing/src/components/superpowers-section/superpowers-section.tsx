import { Button } from '@idriss-xyz/ui/button';
import Image from 'next/image';

import { ProductTile } from './components/product-tile';
import { TopWave } from './components/top-wave';
import {
  CREATORS_INFO,
  EXTENSION_INFO,
  PREDICTION_MARKETS_INFO,
} from './constans';
import { stackedHex } from './assets';

export const SuperpowersSection = () => {
  return (
    <section className="relative bg-mint-100 pb-20">
      <TopWave className="absolute left-0 top-0 z-0 w-full translate-y-[-15%] text-white" />
      <Image
        priority
        src={stackedHex}
        alt=""
        className="absolute bottom-0 right-0 hidden translate-x-[-5%] lg:block"
      />
      <div className="container relative z-1 lg:flex lg:flex-col lg:items-center">
        <div className="mb-10 flex w-full flex-col items-center gap-4 lg:mb-20">
          <h2 className="mt-20 text-center text-display5 gradient-text lg:mt-10 lg:text-display2">
            SUPERPOWERS FOR YOUR INTERNET
          </h2>
          <p className="max-w-[940px] text-center text-body3 text-neutralGreen-900 opacity-70 lg:text-body1">
            Our apps bring the power of crypto and AI to your browsing
            experience, empower creators through digital ownership, and help
            find what’s true on the internet.
          </p>
        </div>
        <div className="flex flex-col items-start justify-center gap-6 lg:grid lg:grid-cols-[repeat(3,_minmax(auto,_431px))] lg:flex-row">
          <ProductTile
            {...EXTENSION_INFO}
            name={EXTENSION_INFO.name}
            title={EXTENSION_INFO.title}
            features={EXTENSION_INFO.features}
            actions={
              <>
                <Button
                  intent="primary"
                  size="large"
                  suffixIconName="IdrissArrowRight"
                  className="text-button2 lg:text-button1"
                  asLink
                  href="https://chromewebstore.google.com/detail/idriss/fghhpjoffbgecjikiipbkpdakfmkbmig"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </Button>
                <Button
                  intent="secondary"
                  size="large"
                  className="text-button2 lg:text-button1"
                  asLink
                  href="https://docs.idriss.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN MORE
                </Button>
              </>
            }
          />
          <ProductTile
            {...CREATORS_INFO}
            name={CREATORS_INFO.name}
            title={CREATORS_INFO.title}
            features={CREATORS_INFO.features}
            actions={
              <>
                <Button
                  intent="primary"
                  size="large"
                  suffixIconName="IdrissArrowRight"
                  className="w-full text-button2 lg:text-button1"
                  asLink
                  href="https://idriss.xyz/creators"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CREATE DONATION LINK
                </Button>
              </>
            }
          />
          <ProductTile
            {...PREDICTION_MARKETS_INFO}
            name={PREDICTION_MARKETS_INFO.name}
            title={PREDICTION_MARKETS_INFO.title}
            features={PREDICTION_MARKETS_INFO.features}
            actions={
              <>
                <Button
                  intent="tertiary"
                  disabled
                  size="large"
                  className="w-full text-button2 lg:text-button1"
                >
                  COMING SOON
                </Button>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
};
