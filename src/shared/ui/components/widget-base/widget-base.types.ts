import { ReactNode } from 'react';

export interface ClosableProperties {
  children: ReactNode;
  className?: string;
  top?: number;
  onHide?: () => void;
}
