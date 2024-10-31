import Image from 'next/image';
import Link from 'next/link';

import { Navigation } from './components';

export const TopBar = () => {
  return (
    <div className="container flex items-center justify-between py-1 lg:py-3">
      <Link href="/">
        <Image
          src="/logo-idriss-dark.png"
          height={24}
          width={98}
          alt=""
          priority
        />
      </Link>
      <Navigation />
    </div>
  );
};
