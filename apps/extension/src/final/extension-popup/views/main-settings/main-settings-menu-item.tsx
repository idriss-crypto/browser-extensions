import { ReactNode } from 'react';

type Properties = {
  label: ReactNode;
  prefix: ReactNode;
  suffix?: ReactNode;
  onClick?: () => void;
};

export const MenuItem = ({ label, prefix, suffix, onClick }: Properties) => {
  return (
    <li
      className="hover:text-green-500 flex cursor-pointer items-center space-x-2 whitespace-nowrap py-3 text-base"
      onClick={onClick}
    >
      {prefix}
      <span>{label}</span>
      {suffix}
    </li>
  );
};
