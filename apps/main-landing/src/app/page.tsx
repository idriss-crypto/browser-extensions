import { headers } from 'next/headers';

import {
  Footer,
  HeroSection,
  SuperpowersSection,
  TokenSection,
  TopBar,
} from '@/components';
import { ProductsSection } from '@/components/products-section/products-section';

// ts-unused-exports:disable-next-line
export default async function Home() {
  const headersList = await headers();

  const withMaintenance = headersList.get('x-with-maintenance');
  if (withMaintenance === 'true') {
    return (
      <div className="flex h-screen items-center justify-center bg-mint-900 text-white">
        <h1 className="text-heading1">Soon...</h1>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <main>
        <HeroSection />
        <SuperpowersSection />
        <ProductsSection />
        <TokenSection />
      </main>
      <Footer />
    </>
  );
}
