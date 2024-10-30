import { ProductTile } from './components/product-tile';
import { StacketHex } from './components/stacket-hex';
import { TopWave } from './components/top-wave';
import { productTilesContent } from './constans';

export const SuperpowersSection = () => {
  return (
    <section className="relative bg-mint-100">
      <TopWave className="absolute left-0 top-0 z-0 w-full translate-y-[-15%] text-white" />
      <StacketHex className="absolute bottom-[-69.791px] right-[-14.449px] hidden lg:block" />
      <div className="container relative z-1">
        <div className="mb-10 flex w-full flex-col items-center gap-4 lg:mb-20">
          <h2 className="text-display5 mt-20 text-center lg:mt-10 lg:text-display2">
            SUPERPOWERS FOR YOUR INTERNET
          </h2>
          <p className="text-body2 max-w-[940px] text-center text-neutralGreen-900 opacity-70 lg:text-body1">
            Our apps bring the power of crypto and AI to your browsing
            experience, empower creators through digital ownership, and help
            find what’s true on the internet.
          </p>
        </div>
        <div className="flex flex-col items-start justify-center gap-6 lg:flex-row">
          {productTilesContent.map((point) => (
            <ProductTile
              productName={point.productName}
              tileTitle={point.tileTitle}
              tileListPoints={point.tilePoints}
            ></ProductTile>
          ))}
        </div>
      </div>
    </section>
  );
};
