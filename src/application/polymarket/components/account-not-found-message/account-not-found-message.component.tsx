import { ErrorMessage } from 'shared/ui/components';

import { POLYMARKET_WEBSITE } from '../../polymarket.constants';

import { AccountNotFoundMessageProperties } from './account-not-found-message.types';

export const AccountNotFoundMessage = ({
  onSwitchWallet,
}: AccountNotFoundMessageProperties) => {
  return (
    <ErrorMessage className="mt-4">
      Account not found. Create{' '}
      <a
        href={POLYMARKET_WEBSITE}
        target="_blank"
        rel="noreferrer"
        className="font-semibold underline"
      >
        Polymarket
      </a>{' '}
      account or{' '}
      <span
        className="cursor-pointer font-semibold underline"
        onClick={onSwitchWallet}
      >
        switch wallet
      </span>
      .
    </ErrorMessage>
  );
};
