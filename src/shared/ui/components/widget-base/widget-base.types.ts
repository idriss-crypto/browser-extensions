import { ReactNode } from 'react';

export interface WidgetBaseProperties {
  children: ReactNode;
  className?: string;
  top?: number;
  zIndex?: number;
  onClose?: () => void;
  closeButtonClassName?: string;
}
