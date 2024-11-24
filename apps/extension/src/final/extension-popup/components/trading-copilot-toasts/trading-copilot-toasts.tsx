import * as RadixToast from "@radix-ui/react-toast";
import {Button} from "@idriss-xyz/ui/button";
import { useState } from "react";

import {Icon, LazyImage, ToastWrapper} from "shared/ui";
import {useCommandQuery} from "shared/messaging";
import {GetEnsInfoCommand} from "application/trading-copilot";

const exampleTradingCopilotToasts = [
  {
    details: {
      name: 'vitalik.eth',
      amount: 150,
      crypto: 'ETH',
      when: '15 mins ago',
    },
    open: true,
    dialogId: 'dialog1',
  },
  {
    details: {
      name: 'vitalikk.eth',
      amount: 300,
      crypto: 'ETH',
      when: '30 mins ago',
    },
    open: true,
    dialogId: 'dialog2',
  }
];

type TradingCopilotToastsProperties = {
  openDialog: (dialogId: string) => void;
};

export const TradingCopilotToasts = ({ openDialog }: TradingCopilotToastsProperties) => {
  return (
    <ToastWrapper>
        {exampleTradingCopilotToasts.map((toast, index) => {
          return (
            <TradingCopilotToast key={index} toast={toast} openDialog={openDialog} />
          )
        })}
    </ToastWrapper>
  );
};

type TradingCopilotToastProperties = {
  toast: {
    details: {
      name: string;
      amount: number;
      crypto: string;
      when: string;
    };
    open: boolean;
    dialogId: string;
  },
  openDialog: (dialogId: string) => void;
};

const TradingCopilotToast = ({toast: {details, open, dialogId}, openDialog}: TradingCopilotToastProperties) => {
  const [isOpen, setIsOpen] = useState(open);

  const avatarQuery = useCommandQuery({
    command: new GetEnsInfoCommand({
      ensName: details.name,
      infoKey: 'avatar',
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });

  return (
    <RadixToast.Root open={isOpen} onSwipeEnd={() => {return setIsOpen(!isOpen)}} style={{
      transform: "translate(var(--radix-toast-swipe-move-x), 0)",
    }}>
      <div className="bg-white px-4 py-5 rounded-xl text-neutralGreen-900">
        <div className='grid grid-cols-[48px,1fr] gap-3'>
          <LazyImage
            src={avatarQuery.data}
            className="size-12 rounded-full"
            fallbackComponent={
              <Icon size={48} name="PersonIcon" className="rounded-full"/>
            }
          />
          <div className="flex flex-col gap-2 w-full">
            <p className="text-heading5 text-neutralGreen-900">{details.name} <span className="text-neutral-700 font-normal">purchased {details.amount} {details.crypto}</span>
            </p>
            <div className="flex flex-row gap-2 justify-between items-start w-full">
              <p className="text-label5 font-normal text-mint-700">{details.when}</p>
              <Button
                intent="primary"
                size="small"
                className="uppercase"
                onClick={() => {
                  openDialog(dialogId);
                  setIsOpen(!open);
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RadixToast.Root>
  )
}