import { DesktopProductsSection } from './desktop-products-section';
import { MobileProductsSection } from './mobile-products-section';

export const ProductsSection = () => {
  return (
    <>
      <DesktopProductsSection className="hidden lg:flex" />
      <MobileProductsSection className="flex lg:hidden" />
    </>
  );
};
