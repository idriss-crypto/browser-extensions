import Image from 'next/image';

import { lines } from '../assets';

export const BackgroundLines = () => {
  return (
    <Image
      priority
      src={lines}
      className="absolute inset-x-20 top-0 hidden opacity-40 lg:block"
      alt=""
    />
  );
};
