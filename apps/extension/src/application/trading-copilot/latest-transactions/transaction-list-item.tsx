import moment, { duration } from 'moment';
import { classes, Spinner } from 'shared/ui';
import { ConfirmTransactionForm } from './confirm-transaction-form';
import { SwapWithNetworkInfo } from './latest-transactions';
import { SUPPORTED_ICONS, SupportedIcon, TOKEN_SYMBOL_TO_ICON } from './icons';

type TransactionListItemProps = {
  transaction: SwapWithNetworkInfo;
  isTransactionFormOpened: boolean;
  className?: string;
  onFormToggleClick: (transactionId: string | undefined) => void;
};

export const TransactionListItem = ({
  transaction,
  isTransactionFormOpened,
  className,
  onFormToggleClick,
}: TransactionListItemProps) => {
  const purchasedToken = {
    purchaseAmount: 1,
    purchaseToken: {
      name: 'string',
      symbol: 'string',
    },
  };

  const timestamp = moment(Number(transaction.timestamp) * 1000);
  const timeFromNow = timestamp.diff(moment(), 'minutes');
  const timeFromNowText = duration(timeFromNow, 'minutes').humanize(true);
  const showPulseIcon = Math.abs(timeFromNow) <= 24 * 60;

  const tokenSymbol =
    purchasedToken.purchaseToken.symbol.toUpperCase() as SupportedIcon;

  const tokenIcon = SUPPORTED_ICONS.includes(tokenSymbol)
    ? TOKEN_SYMBOL_TO_ICON[tokenSymbol]
    : TOKEN_SYMBOL_TO_ICON.ETH;

  const isLoading = false;
  const isSuccess = false;

  return (
    <li className={`flex w-full flex-col transition-opacity ${className}`}>
      <div className="flex w-full justify-between gap-x-4 py-3">
        <div className="flex w-full min-w-0 gap-x-3">
          <img
            className="size-10 flex-none rounded-full bg-[#f9fafb]"
            src={tokenIcon}
            alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-nowrap text-sm font-semibold leading-6 text-[#111827]">
              {purchasedToken.purchaseToken.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-[#6b7280]">
              {purchasedToken.purchaseToken.symbol}
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p
            className="text-sm leading-6 text-[#111827]"
            title={`${purchasedToken.purchaseAmount} ${purchasedToken.purchaseToken.symbol}`}
          >
            {Number(purchasedToken.purchaseAmount).toPrecision(4)}{' '}
            {purchasedToken.purchaseToken.symbol}
          </p>
          <div className="mt-1 flex items-center gap-x-1.5">
            {showPulseIcon && (
              <div className="flex-none animate-pulse rounded-full bg-[rgba(16,185,129,0.2)] p-1">
                <div className="size-1.5 rounded-full bg-[#10b981]" />
              </div>
            )}
            <p
              className="text-xs leading-5 text-[#6b7280]"
              title={timestamp.format('YYYY-MM-DD HH:MM:SS')}
            >
              Purchased {timeFromNowText}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            disabled={isLoading}
            onClick={() => {
              return isTransactionFormOpened
                ? onFormToggleClick(undefined)
                : onFormToggleClick(transaction.id);
            }}
            className={`${!isTransactionFormOpened ? 'relative bg-[#16a34a] hover:bg-[#15803d]' : 'bg-[#9ca3af] hover:bg-[#6b7280]'} relative rounded-lg px-4 py-2 text-xs font-bold text-white shadow-lg`}
          >
            <Spinner
              className={classes(
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                !isLoading && 'invisible',
              )}
            />
            <span className={classes(isLoading && 'invisible')}>
              {isSuccess
                ? 'Success'
                : isTransactionFormOpened && !isSuccess
                  ? 'Close'
                  : 'Buy'}
            </span>
          </button>
        </div>
      </div>
      {isTransactionFormOpened && (
        <ConfirmTransactionForm
          onConfirmClicked={function (): void {
            console.log('Function not implemented.');
          }}
        />
      )}
    </li>
  );
};
