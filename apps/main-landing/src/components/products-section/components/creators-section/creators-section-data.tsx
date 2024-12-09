import { ProductSectionInfo } from '../product-section';

import { CreatorsSectionActions } from './creators-section-actions';

const CREATORS_INFO: ProductSectionInfo = {
  title: 'MONETIZE YOUR CONTENT EVERYWHERE YOU CREATE',
  description:
    'Get instant donations in your favorite cryptocurrencies and unlock new ways to grow on Twitch, YouTube, and more.',
  features: [
    {
      icon: 'TwitchOutlined',
      title: 'Twitch',
      description:
        'Engage your audience with crypto donations for real-time interactions on your gaming streams and beyond',
    },
    {
      icon: 'YoutubeOutlined',
      title: 'YouTube',
      description:
        'Monetize both streams and videos with donation links that continue earning even after you go offline',
    },
  ],
};

export const CreatorsSectionData = {
  actions: <CreatorsSectionActions />,
  info: CREATORS_INFO,
  defaultOptionKey: 'creators',
};
