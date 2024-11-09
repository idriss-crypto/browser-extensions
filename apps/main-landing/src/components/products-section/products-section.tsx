'use client';

import { QueryProvider } from '@/providers';

import { DesktopProductsSection, MobileProductsSection } from './components';
import { useWindowSize } from 'react-use';

export const ProductsSection = () => {
  const windowSize = useWindowSize();

  const isMobile = windowSize.width < 1024;

  return (
    <QueryProvider>
      {isMobile ? (
        <MobileProductsSection className="flex lg:hidden" />
      ) : (
        <DesktopProductsSection className="hidden lg:flex" />
      )}
    </QueryProvider>
  );
};
