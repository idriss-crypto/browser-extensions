import Image from 'next/image';

import { tokensFlow } from '../assets';

export const TokensFlowImage = () => {
  return (
    <Image
      priority
      src={tokensFlow}
      className="z-0 -mt-[22%] w-full min-w-[500px] md:-mt-[18%] lg:-mt-[15%]"
      alt=""
    />
  );
};
