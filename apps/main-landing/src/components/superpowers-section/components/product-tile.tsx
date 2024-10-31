import { Icon } from '@idriss-xyz/ui/icon';

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
    <div className="flex-start flex flex-1 flex-col gap-4 self-stretch rounded-[24px] bg-white/80 px-4 py-6 backdrop-blur-[7px] lg:gap-6 lg:px-10 lg:py-11">
      <span className="text-label5 text-neutralGreen-700 lg:text-label4">
        {productName}
      </span>
      <span className="text-heading5 text-neutral-900 lg:text-heading4">
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

      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: 'visible',
          position: 'absolute',
          top: '0',
          left: '0',
          width: ' 100%',
          height: '100%',
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#5FEB3C" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="24"
          ry="24"
          fill="none"
          stroke="url('#gradient')"
          stroke-width="2"
        />
      </svg>
    </div>
  );
};
