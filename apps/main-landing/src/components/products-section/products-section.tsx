import { DesktopProductsSection, MobileProductsSection } from './components';

export const ProductsSection = () => {
  return (
    <>
      <DesktopProductsSection className="hidden lg:flex" />
      <MobileProductsSection className="flex lg:hidden" />
    </>
  );
};
