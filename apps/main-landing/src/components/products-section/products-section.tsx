'use client';

import { QueryProvider } from '@/providers';

import { DesktopProductsSection, MobileProductsSection } from './components';

export const ProductsSection = () => {
  return (
    <QueryProvider>
      <DesktopProductsSection className="hidden lg:flex" />
      <MobileProductsSection className="flex lg:hidden" />
    </QueryProvider>
  );
};
