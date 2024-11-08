import { ProductSectionInfo } from './components/product-section';
import { TabOption } from './types';

export const BROWSER_EXTENSION_INFO: ProductSectionInfo = {
  title: 'CRYPTO AND AI EXPANSION PACK FOR YOUR BROWSER',
  describtion:
    'Enhance your browsing experience with crypto micropayments, DAO vote alerts, and trading widgets directly in your browser',
  features: [
    {
      icon: 'Tipping',
      title: 'Tipping badges',
      describtion: 'Send and receive crypto on X and Farcaster',
    },
    {
      icon: 'Governance',
      title: 'Governance widget',
      describtion:
        'Get alerts for active DAO votes on Agora, Snapshot, and Tally',
    },
    {
      icon: 'PolymarketIcon',
      title: 'Polymarket widget',
      describtion: 'Bet on Polymarket directly from your X feed',
    },
    {
      icon: 'Trading',
      title: 'Trading copilot',
      describtion: 'Copy onchain moves of your favorite traders',
    },
  ],
};

export const CREATORS_INFO: ProductSectionInfo = {
  title: 'MONETIZE YOUR CONTENT',
  describtion:
    'Get instant donations of your favorite cryptos directly to your wallet on Twitch, YouTube, and more',
  features: [
    {
      icon: 'TwitchOutlined',
      title: 'Twitch',
      describtion:
        'Engage your live audience with crypto donations for real-time interactions on your gaming streams and beyond',
    },
    {
      icon: 'YoutubeOutlined',
      title: 'YouTube',
      describtion:
        'Monetize both streams and videos with donation links that continue earning even after you go offline',
    },
  ],
};

export const PREDICTION_MARKETS_INFO: ProductSectionInfo = {
  title: 'EXPLORE THE FULL POTENTIAL OF PREDICTION MARKETS',
  describtion:
    'Bigger, better, and bolder: harness the wisdom of the crowd to drive social engagement, verify news authenticity, and detect generative AI.',
  features: [
    {
      icon: 'Users',
      title: 'Micro markets embedded in socials',
    },
    {
      icon: 'Verifying',
      title: 'Verifying authenticity of news and detecting genAI',
    },
    {
      icon: 'Head',
      title: 'Markets for AI agents',
    },
  ],
};

  export const tabOptions: TabOption[] = [
    { name: 'Extension', key: 'extension-product' },
    { name: 'Creators', key: 'creators-product' },
    { name: 'Prediction Markets', key: 'prediction-markets-product' },
  ] as const
