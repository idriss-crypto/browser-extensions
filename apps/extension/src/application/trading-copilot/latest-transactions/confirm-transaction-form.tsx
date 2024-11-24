import { useState } from 'react';

type ConfirmTransactionFormProperties = {
  onConfirmClicked: (amount: number) => void;
};

export const ConfirmTransactionForm = ({
  onConfirmClicked,
}: ConfirmTransactionFormProperties) => {
  const [balancePercentage, setBalancePercentage] = useState(10);
  const currentETHBalance = 2;

  const totalValue = Number((currentETHBalance * balancePercentage) / 100);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <label
          htmlFor="percentageTemplate"
          className="block text-sm font-medium text-[#374151]"
        >
          How much?
        </label>
        <p className="text-sm text-[#4b5563]">
          Balance:{' '}
          <span className="font-medium">
            {Number(currentETHBalance).toPrecision(4)} ETH{' '}
          </span>
        </p>
      </div>
      <input
        id="percentageTemplate"
        type="range"
        min="0"
        max="100"
        value={balancePercentage}
        onChange={(event) => {
          return setBalancePercentage(Number(event.target.value));
        }}
        className="mt-1 w-full outline-none"
      />
      <div className="flex items-center justify-between">
        <div className="mt-2 flex gap-2">
          <p className="text-sm text-[#4b5563]">{balancePercentage}%</p>
          <p className="text-sm font-medium text-[#4b5563]">
            {Number(totalValue).toPrecision(4)} ETH
          </p>
        </div>
        <button
          onClick={() => {
            return onConfirmClicked(totalValue);
          }}
          className="ml-auto rounded-lg bg-[#16a34a] px-3 py-2 text-xs font-bold text-white shadow-lg hover:bg-[#15803d]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
