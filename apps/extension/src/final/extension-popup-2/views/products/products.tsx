import { Icon } from '@idriss-xyz/ui/icon';
import { ExternalLink } from '@idriss-xyz/ui/external-link';

import {
  AGORA_LOGO,
  IDRISS_COIN,
  LINES,
  POLYMARKET_LOGO,
  SNAPSHOT_LOGO,
  TALLY_LOGO,
} from 'assets/images';

import { ProductCard } from './product-card';

export const Products = () => {
  return (
    <div className="relative bg-mint-100 px-4 py-6">
      <img
        src={LINES}
        className="pointer-events-none absolute left-0 top-0 hidden opacity-40 lg:block"
        alt=""
      />

      <h1 className="text-center text-heading5 text-neutralGreen-900">
        {`GM, it's your web3 copilot speaking`}
      </h1>
      <p className="mt-2 text-center text-label4 text-neutralGreen-700">
        Explore your favorite features below
      </p>
      <div className="mt-10 grid grid-cols-2 gap-3">
        <ExternalLink href="https://x.com/IDriss_xyz/status/1729258820441170160">
          <ProductCard
            heading={<img src={IDRISS_COIN} alt="" className="size-10" />}
            title={
              <ProductCard.Title className="mt-4">
                Tipping Badges
              </ProductCard.Title>
            }
            description={
              <ProductCard.Description className="mt-1">
                Send crypto on X and Farcaster
              </ProductCard.Description>
            }
          />
        </ExternalLink>

        <ExternalLink href="https://x.com/IDriss_xyz/status/1761049574691819798">
          <ProductCard
            heading={
              <div className="flex space-x-2">
                <img src={AGORA_LOGO} alt="" className="size-10" />
                <img src={TALLY_LOGO} alt="" className="size-10" />
                <img src={SNAPSHOT_LOGO} alt="" className="size-10" />
              </div>
            }
            title={
              <ProductCard.Title className="mt-4">
                Governance Widget
              </ProductCard.Title>
            }
            description={
              <ProductCard.Description className="mt-1">
                Get alerts for active DAO votes
              </ProductCard.Description>
            }
          />
        </ExternalLink>

        <ExternalLink href="https://x.com/IDriss_xyz/status/1780582103396266085">
          <ProductCard
            heading={<img src={POLYMARKET_LOGO} alt="" className="size-10" />}
            title={
              <ProductCard.Title className="mt-4">
                Polymarket Widget
              </ProductCard.Title>
            }
            description={
              <ProductCard.Description className="mt-1">
                Trade directly from your X feed
              </ProductCard.Description>
            }
          />
        </ExternalLink>

        <ProductCard
          className="hover:scale-100 hover:bg-white"
          heading={
            <div className="opacity-40">
              <Icon name="Rocket" size={40} className="text-black" />
            </div>
          }
          title={
            <ProductCard.Title className="mt-4 opacity-40">
              Trading Copilot
            </ProductCard.Title>
          }
          description={
            <ProductCard.Description className="mt-1 opacity-40">
              Coming soon
            </ProductCard.Description>
          }
        />
      </div>
    </div>
  );
};
