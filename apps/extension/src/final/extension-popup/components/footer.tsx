import { ExternalLink } from '@idriss-xyz/ui/external-link';

import { Icon } from 'shared/ui';

import { footerLinks } from '../constants';

export const Footer = () => {
  return (
    <footer className="grid grid-cols-3 divide-x divide-[#111827]/5 bg-white drop-shadow-2xl">
      {footerLinks.map((link) => {
        return (
          <ExternalLink
            key={link.iconName}
            href={link.href}
            className="flex items-center justify-center gap-x-2 p-3 font-medium text-[#111827] hover:bg-[#f9fafb]"
          >
            <Icon name={link.iconName} className="text-[#9fa2ae]" />
            {link.text}
          </ExternalLink>
        );
      })}
    </footer>
  );
};
