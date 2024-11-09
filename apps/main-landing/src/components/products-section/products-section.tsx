'use client';

import { QueryProvider } from '@/app/providers/query';

import { DesktopProductsSection, MobileProductsSection } from './components';

export const ProductsSection = () => {
  return (
    <QueryProvider>
      <DesktopProductsSection className="hidden lg:flex" />
      <MobileProductsSection className="flex lg:hidden" />
    </QueryProvider>
  );
};
