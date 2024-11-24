import {Button} from "@idriss-xyz/ui/button";
import {Controller, useForm} from "react-hook-form";
import { Icon as IdrissIcon } from '@idriss-xyz/ui/icon';

import {Dialog, Icon, LazyImage} from "shared/ui";
import {useCommandQuery} from "shared/messaging";
import {GetEnsInfoCommand} from "application/trading-copilot";

const exampleTradingCopilotDialogs = [
  {
    details: {
      name: 'vitalik.eth',
      amount: 150,
      crypto: 'ETH',
      when: '15 mins ago',
      title: "Trading copilot",
    },
    user: {
      balance: 200,
      crypto: 'ETH',
    },
    id: 'dialog1',
  },
  {
    details: {
      name: 'vitalikk.eth',
      amount: 300,
      crypto: 'ETH',
      when: '30 mins ago',
      title: "Trading copilot",
    },
    user: {
      balance: 200,
      crypto: 'ETH',
    },
    id: 'dialog2',
  },
];

type TradingCopilotDialogsProperties = {
  activeDialogId: string | null,
  closeDialog: () => void,
}

export const TradingCopilotDialogs = ({ activeDialogId, closeDialog }: TradingCopilotDialogsProperties) => {
  const activeDialog = exampleTradingCopilotDialogs.find((dialog) => {return dialog.id === activeDialogId});

  if (!activeDialog) return null;

  return (
    <>
      {
        exampleTradingCopilotDialogs.map((dialog, index) => {
          return (
            <TradingCopilotDialog key={index} dialog={dialog} activeDialogId={activeDialogId} closeDialog={closeDialog} />
          )
        })
      }
    </>
  )
};

type TradingCopilotFormValues = {
  amount: string;
};

const EMPTY_FORM: TradingCopilotFormValues = {
  amount: '',
};

type TradingCopilotDialogProperties = {
  dialog: {
    details: {
      name: string,
      amount: number,
      crypto: string,
      when: string,
      title: string,
    }
    user: {
      balance: number,
      crypto: string,
    },
    id: string,
  },
  activeDialogId: string | null,
  closeDialog: () => void
}

const TradingCopilotDialog = ({dialog: {details, user, id}, activeDialogId, closeDialog}: TradingCopilotDialogProperties) => {
  const form = useForm<TradingCopilotFormValues>({
    defaultValues: EMPTY_FORM,
  });

  const avatarQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: details.name,
      infoKey: 'avatar',
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });

  return (
    <Dialog open={id === activeDialogId} closeDialog={closeDialog} title={details.title}>
      <div className="flex flex-col gap-y-6">
        <div className='flex flex-row gap-3'>
          <LazyImage
            src={avatarQuery.data}
            className="size-12 rounded-full"
            fallbackComponent={
              <Icon size={48} name="PersonIcon" className="rounded-full"/>
            }
          />
          <div className="flex flex-col gap-2">
            <p className="text-heading5 text-neutralGreen-900">{details.name} <span className="text-neutral-700 font-normal">purchased {details.amount} {details.crypto}</span></p>
            <div className="flex flex-row gap-2 justify-between items-start">
              <p className="text-label5 font-normal text-mint-700">{details.when}</p>
            </div>
          </div>
        </div>
        <form>
          <div className="flex flex-row justify-between items-center">
            <label
              htmlFor="cryptoAmount"
              className="block text-lg text-neutralGreen-900"
            >
              Amount
            </label>
            <p className="text-sm text-neutral-700">Balance: {user.balance} {user.crypto}</p>
          </div>
          <Controller
            control={form.control}
            name="amount"
            render={({field}) => {
              return (
                <span className="mt-1 relative flex flex-row">
                  <input
                    {...field}
                    type="number"
                    id="cryptoAmount"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&:focus+svg]:border-[#3b82f6] text-right block w-full rounded-md border border-[#D1D5DB] bg-white ps-14 pe-3 py-2 text-black shadow-sm focus:border-[#3b82f6] focus:outline-none focus:ring-[#3b82f6] sm:text-sm"
                    placeholder="ETH"
                  />
                  <IdrissIcon
                    size={20}
                    name="Bitcoin"
                    className="pointer-events-none text-neutral-700 absolute top-1/2 -translate-y-1/2 start-0 px-3 border-r border-[#D1D5DB] w-[44px] h-full"
                  />
                </span>
              );
            }}
          />
        </form>
        <div>
          <Button
            intent="primary"
            size="medium"
            className="uppercase w-full"
          >
            BUY
          </Button>
        </div>
      </div>
    </Dialog>
  )
}