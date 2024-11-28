import { ReactNode } from 'react';

export type DialogProperties = {
  open: boolean;
  title: string;
  children: ReactNode;
  closeDialog: () => void;
};
