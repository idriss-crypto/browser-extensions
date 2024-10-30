import { Icon } from '@idriss-xyz/ui/icon';
import test from './test.svg';

type ProductTitleProperties = {
  productName: string;
  tileTitle: string;
  tileListPoints: string[];
};

export const ProductTile = ({
  productName,
  tileTitle,
  tileListPoints,
}: ProductTitleProperties) => {
  return (
    <div className="relative flex flex-[1_0_0] self-stretch">
      <div
        className="absolute z-[9999] size-full"
        style={{
          background:
            'linear-gradient(0deg, #5FEB3C 0%, #FFFFFF 80%, transparent 100%)',
          borderRadius: '20px',
          mask: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect x="0.5" y="0.5" width="99" height="99" rx="4" ry="4" fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="1"/></svg>'), linear-gradient(#000 0 0)`,
          maskSize: '100% 100%',
          maskPosition: 'center',
        }}
      ></div>
      <div className="border-icon-stroke flex flex-col gap-4 rounded-[24px] border-solid bg-white/80 px-4 py-6 backdrop-blur-[7px] lg:gap-6 lg:px-10 lg:py-11">
        <span className="text-label5 lg:text-label4 text-neutralGreen-700">
          {productName}
        </span>
        <span className="text-heading5 lg:text-heading4 text-neutral-900">
          {tileTitle}
        </span>
        <ul className="flex flex-col gap-4 text-neutralGreen-700">
          {tileListPoints.map((point) => (
            <li className="flex flex-row gap-3">
              <div>
                <Icon name="Check" size={20} />
              </div>
              <div className="text-body5 lg:text-body4" key={point}>
                {point}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
