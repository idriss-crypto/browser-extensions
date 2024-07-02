import { classes } from 'shared/ui/utils';

interface TabHandleProperties {
  left: number;
  imageSrc?: string;
  name: string;
  isActive: boolean;
  theme: 'bright' | 'dark';
  onClick: () => void;
}

export const TabHandle = ({
  left,
  imageSrc,
  name,
  isActive,
  theme,
  onClick,
}: TabHandleProperties) => {
  return (
    <div
      onClick={onClick}
      style={{
        left,
      }}
      className={classes(
        'absolute -top-[25px] flex h-[25px] w-[100px] cursor-pointer flex-row items-center gap-[10px] rounded-tl-[2px] rounded-tr-[20px] pl-1 pt-1 font-bold transition-all duration-75 ease-linear',
        {
          'bg-[#2d2d2d]': theme === 'dark',
          'bg-white': theme === 'bright',
          '-top-[23px] -translate-x-[3px] scale-95 brightness-75': !isActive,
        },
      )}
    >
      {imageSrc && <img className="h-3/4" src={imageSrc} />}
      <span
        className={classes({
          'text-white': theme === 'dark',
          'text-black': theme === 'bright',
        })}
      >
        {name}
      </span>
    </div>
  );
};
